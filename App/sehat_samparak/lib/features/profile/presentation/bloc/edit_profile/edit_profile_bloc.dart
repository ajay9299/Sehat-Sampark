import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/features/profile/data/repository/user_repository.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/edit_profile/edit_profile_event.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/edit_profile/edit_profile_state.dart';

class EditProfileBloc extends Bloc<EditProfileEvent, EditProfileState> {
  final UserRepository userRepository;

  EditProfileBloc(this.userRepository) : super(EditProfileInitial()) {
    on<SaveProfileEvent>(_mapEditProfileEventToState);
  }

  /// Mapping the Profile event with the state
  /// Takes two parameters [event] and [emit]
  ///
  /// Returns an event
  void _mapEditProfileEventToState(
    EditProfileEvent event,
    Emitter<EditProfileState> emit,
  ) async {
    if (event is SaveProfileEvent) {
      emit(EditProfileSaving());

      try {
        final response = await userRepository.updateUserProfile(
          event.height,
          event.weight,
          event.bloodGroup,
        );
        if (response.statusCode == 200) {
          emit(EditProfileSaved());
        } else {
          emit(const EditProfileError('Profile not updated!'));
        }
      } catch (e) {
        emit(EditProfileError('Failed to update user profile: ${e.toString()}'));
      }
    }
  }
}
