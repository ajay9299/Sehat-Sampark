import 'package:equatable/equatable.dart';

abstract class ConsultationEvent extends Equatable {
  const ConsultationEvent();

  @override
  List<Object> get props => [];
}

class FetchConsultationHistoryEvent extends ConsultationEvent {
  const FetchConsultationHistoryEvent();
}