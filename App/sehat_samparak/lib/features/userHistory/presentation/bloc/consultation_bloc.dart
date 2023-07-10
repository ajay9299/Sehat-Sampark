import 'dart:convert';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_event.dart';
import 'package:sehat_sampark/features/userHistory/data/repository/medical_history_repository.dart';
import 'package:sehat_sampark/features/userHistory/presentation/bloc/consultation_event.dart';
import 'package:sehat_sampark/features/userHistory/presentation/bloc/consultation_state.dart';

class ConsultationBloc extends Bloc<ConsultationEvent, ConsultationState> {
  final MedicalHistoryRepository medicalHistoryRepository;

  ConsultationBloc(this.medicalHistoryRepository)
      : super(ConsultationInitialState()) {
    on<FetchConsultationHistoryEvent>(_mapFetchConsultationHistoryEventToState);
  }

  /// Mapping the Consultation event with the state
  /// Takes two parameters [event] and [emit]
  ///
  /// Returns an event
  void _mapFetchConsultationHistoryEventToState(
    ConsultationEvent event,
    Emitter<ConsultationState> emit,
  ) async {
    if (event is FetchConsultationHistoryEvent) {
      emit(ConsultationLoadingState());
      try {
        final response =
            await medicalHistoryRepository.fetchUserConsultationHistory();
        if (response.statusCode == 200) {
          final jsonResponse = jsonDecode(response.body);
          final consultationData = jsonResponse['data'];

          emit(ConsultationLoadedState(consultationData));
        } else {
          emit(const ConsultationErrorState('Something went wrong!'));
        }
      } catch (e) {
        emit(ConsultationErrorState(
            'Failed to load user profile: ${e.toString()}'));
      }
    }
  }
}
