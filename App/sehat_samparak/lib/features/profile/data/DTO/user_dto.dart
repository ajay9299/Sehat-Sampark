class UpdateProfileRequest {
  final String height;
  final String weight;
  final String? bloodGroup;

  UpdateProfileRequest({required this.height, required this.weight, required this.bloodGroup});

  Map<String, dynamic> toJson() {
    return {
      'weight': weight,
      'height': height,
      'bloodGroup': bloodGroup
    };
  }
}