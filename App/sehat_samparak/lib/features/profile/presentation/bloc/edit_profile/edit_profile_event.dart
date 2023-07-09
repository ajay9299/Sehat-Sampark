import 'package:equatable/equatable.dart';

abstract class EditProfileEvent extends Equatable {
  const EditProfileEvent();

  @override
  List<Object?> get props => [];
}

class SaveProfileEvent extends EditProfileEvent {
  final String height;
  final String weight;
  final String? bloodGroup;

  const SaveProfileEvent(this.height, this.weight, this.bloodGroup);

  @override
  List<Object?> get props => [height, weight, bloodGroup];
}
