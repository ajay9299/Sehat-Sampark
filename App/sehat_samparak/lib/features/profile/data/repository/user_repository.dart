import 'dart:convert';

import 'package:sehat_sampark/core/config/api_config.dart';
import 'package:sehat_sampark/core/constants/api_constant.dart';
import 'package:http/http.dart' as http;
import 'package:sehat_sampark/features/profile/data/DTO/user_dto.dart';

class UserRepository {
  final String profileUrl = ApiConstant.myProfile;

  /// Fetch the user profile from the token
  ///
  /// Returns [http.Response]
  Future<http.Response> fetchUserProfile() async {
    final response = await http.get(
      Uri.parse(ApiConstant.myProfile),
      headers: await ApiConfig.headers,
    );

    return response;
  }

  /// Update the user [height], [weight] and [bloodGroup] profile
  ///
  /// Returns [http.Response]
  Future<http.Response> updateUserProfile(
    String height,
    String weight,
    String? bloodGroup,
  ) async {
    final updateProfileRequest = UpdateProfileRequest(
      height: height,
      weight: weight,
      bloodGroup: bloodGroup,
    );
    final verifyUpdateProfileRequestJson = jsonEncode(updateProfileRequest);

    final response = await http.patch(
      Uri.parse(ApiConstant.updateProfile),
      headers: await ApiConfig.headers,
      body: verifyUpdateProfileRequestJson,
    );
    return response;
  }
}
