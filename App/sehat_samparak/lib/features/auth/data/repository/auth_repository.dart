import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sehat_sampark/core/constants/api_constant.dart';
import 'package:sehat_sampark/features/auth/data/DTO/auth_response.dart';

class UserRepository {
  final String signInUrl = ApiConstant.signIn;
  final String verifyOtpUrl = ApiConstant.verifyOtp;

  /// Verifies the [uniqueId] entered by the user
  ///
  /// Returns [http.Response]
  Future<http.Response> verifyUniqueId(String uniqueId) async {
    final sendUniqueIdRequest = SendUniqueId(uniqueId: uniqueId);
    final sendUniqueIdRequestJson = jsonEncode(sendUniqueIdRequest);

    const url = ApiConstant.signIn;

    final response = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: sendUniqueIdRequestJson,
    );

    return response;
  }

  /// Verifies the [otp] received by the user based on it's [uniqueId]
  ///
  /// Returns [http.Response]
  Future<http.Response> verifyOTP(String uniqueId, String otp) async {
    final verifyOTPRequest = VerifyOTPRequest(uniqueId: uniqueId, otp: otp);
    final verifyOTPRequestJson = jsonEncode(verifyOTPRequest);

    final response = await http.post(
      Uri.parse(verifyOtpUrl),
      headers: {
        'Content-Type': 'application/json',
      },
      body: verifyOTPRequestJson,
    );

    return response;
  }

/*Future<String> verifyOTP(String phoneNumber, String otp) async {
    final verifyOTPRequest =
        VerifyOTPRequest(phoneNumber: phoneNumber, otp: otp);
    final verifyOTPRequestJson = jsonEncode(verifyOTPRequest);

    final response = await http.post(
      Uri.parse('$baseUrl/verify-otp'),
      body: verifyOTPRequestJson,
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final verifyOTPResponse = VerifyOTPResponse.fromJson(data);
      return verifyOTPResponse.token;
    } else {
      throw Exception('OTP verification failed');
    }
  }*/
}
