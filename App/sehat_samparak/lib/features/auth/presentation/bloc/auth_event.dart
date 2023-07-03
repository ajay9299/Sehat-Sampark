import 'package:equatable/equatable.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object> get props => [];
}

class VerifyUniqueIdEvent extends AuthEvent {
  final String uniqueId;

  const VerifyUniqueIdEvent(this.uniqueId);

  @override
  List<Object> get props => [uniqueId];
}

class VerifyOtpEvent extends AuthEvent {
  final String uniqueId;
  final String otp;

  const VerifyOtpEvent(this.uniqueId, this.otp);

  @override
  List<Object> get props => [uniqueId, otp];
}
