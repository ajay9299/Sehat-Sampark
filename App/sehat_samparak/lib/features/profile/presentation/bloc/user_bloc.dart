import 'dart:convert';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/features/profile/data/repository/user_repository.dart';
import 'package:sehat_sampark/features/profile/domain/entity/user_entity.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_event.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  final UserRepository userRepository;

  UserBloc(this.userRepository) : super(UserInitialState()) {
    on<UserProfileEvent>(_mapUserProfileEventToState);
  }

  /// Mapping the Profile event with the state
  /// Takes two parameters [event] and [emit]
  ///
  /// Returns an event
  void _mapUserProfileEventToState(
    UserEvent event,
    Emitter<UserState> emit,
  ) async {
    if (event is UserProfileEvent) {

      emit(UserLoadingState());
      try {
        final response = await userRepository.fetchUserProfile();
        if (response.statusCode == 200) {
          final jsonResponse = jsonDecode(response.body);
          final userInfo = jsonResponse['data']['patientInfo'];

          final user = UserEntity.fromJson(userInfo);
          emit(UserSuccessState(user));
        } else {
          emit(const UserErrorState('Something went wrong!'));
        }
      } catch (e) {
        emit(UserErrorState('Failed to load user profile: ${e.toString()}'));
      }
    }
  }
}
