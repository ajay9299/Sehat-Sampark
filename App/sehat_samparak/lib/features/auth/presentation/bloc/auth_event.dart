import 'package:equatable/equatable.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_bloc.dart';

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
  final UserBloc userBloc;

  const VerifyOtpEvent(this.uniqueId, this.otp, this.userBloc);

  @override
  List<Object> get props => [uniqueId, otp];
}
