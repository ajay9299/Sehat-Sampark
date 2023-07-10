import 'package:equatable/equatable.dart';

abstract class UserEvent extends Equatable {
  const UserEvent();

  @override
  List<Object> get props => [];
}

class UserProfileEvent extends UserEvent {
  const UserProfileEvent();

  @override
  List<Object> get props => [];
}