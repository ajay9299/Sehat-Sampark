import 'package:equatable/equatable.dart';

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

  const AuthOtpVerificationSuccess(this.otp);

  @override
  List<Object> get props => [otp];
}
