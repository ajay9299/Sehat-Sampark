import 'package:equatable/equatable.dart';
import 'package:sehat_sampark/features/profile/domain/entity/user_entity.dart';

abstract class UserState extends Equatable {
  const UserState();

  @override
  List<Object> get props => [];
}

class UserInitialState extends UserState {}

class UserLoadingState extends UserState {}

class UserSuccessState extends UserState {
  final UserEntity user;

  const UserSuccessState(this.user);

  @override
  List<Object> get props => [user];
}

class UserErrorState extends UserState {
  final String error;

  const UserErrorState(this.error);

  @override
  List<Object> get props => [error];
}