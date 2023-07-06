import 'package:equatable/equatable.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_bloc.dart';

abstract class AuthState extends Equatable {
  const AuthState();

  @override
  List<Object> get props => [];
}

class AuthInitialState extends AuthState {}

class AuthLoadingState extends AuthState {}

class AuthSuccessState extends AuthState {
  const AuthSuccessState();

  @override
  List<Object> get props => [];
}

class AuthErrorState extends AuthState {
  final String error;

  const AuthErrorState(this.error);

  @override
  List<Object> get props => [error];
}

class AuthOtpVerificationSuccess extends AuthState {
  final String otp;
  final String token;
  final UserBloc userBloc;
  //event.userBloc.add(UserProfileEvent(token));

  const AuthOtpVerificationSuccess(this.otp, this.token, this.userBloc);

  @override
  List<Object> get props => [otp];
}
