import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/features/auth/data/repository/auth_repository.dart';
import 'package:sehat_sampark/features/auth/data/repository/session_repository.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_event.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_state.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_event.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository authRepository;
  final SessionManager sessionManager;

  AuthBloc(this.authRepository, this.sessionManager) : super(AuthInitialState()) {
    on<VerifyUniqueIdEvent>(_mapUniqueIdEventToState);
    on<VerifyOtpEvent>(_mapVerifyOtpEventToState);
  }

  void _mapUniqueIdEventToState(
    AuthEvent event,
    Emitter<AuthState> emit,
  ) async {
    if (event is VerifyUniqueIdEvent) {
      emit(AuthLoadingState());
      try {
        final response = await authRepository.verifyUniqueId(event.uniqueId);
        if (response.statusCode == 200) {
          emit(const AuthSuccessState());
        } else {
          emit(const AuthErrorState('Failed to verify uniqueID.'));
        }
      } catch (e) {
        emit(AuthErrorState('Login failed: ${e.toString()}'));
      }
    }
  }

  void _mapVerifyOtpEventToState(
    AuthEvent event,
    Emitter<AuthState> emit,
  ) async {
    if (event is VerifyOtpEvent) {
      emit(AuthLoadingState());

      try {
        final response = await authRepository.verifyOTP(event.uniqueId, event.otp);
        if (response.statusCode == 200) {
          final jsonResponse = jsonDecode(response.body);

          debugPrint("jsonResponse ${jsonResponse["data"]['jwtToken']}");
          final token = jsonResponse["data"]['jwtToken'];

          await sessionManager.saveToken(token);
          emit(AuthOtpVerificationSuccess(event.otp, token, event.userBloc));
        }
      } catch (e) {
        emit(AuthErrorState('OTP verification failed: ${e.toString()}'));
      }
    }
  }
}
