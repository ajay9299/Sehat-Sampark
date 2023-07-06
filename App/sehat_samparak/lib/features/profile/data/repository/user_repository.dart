import 'package:sehat_sampark/core/config/api_config.dart';
import 'package:sehat_sampark/core/constants/api_constant.dart';
import 'package:http/http.dart' as http;

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
}
