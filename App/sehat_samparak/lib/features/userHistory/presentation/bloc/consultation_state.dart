import 'package:equatable/equatable.dart';

abstract class ConsultationState extends Equatable {
  const ConsultationState();

  @override
  List<Object> get props => [];
}

class ConsultationInitialState extends ConsultationState {}

class ConsultationLoadingState extends ConsultationState {}

class ConsultationLoadedState extends ConsultationState {
  final List<dynamic> consultationData;
  const ConsultationLoadedState(this.consultationData);

  @override
  List<Object> get props => [consultationData];
}

class ConsultationErrorState extends ConsultationState {
  final String error;

  const ConsultationErrorState(this.error);

  @override
  List<Object> get props => [error];
}
