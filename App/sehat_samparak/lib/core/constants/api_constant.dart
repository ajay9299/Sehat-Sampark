import 'package:sehat_sampark/core/config/api_config.dart';

class ApiConstant {
  static const String signIn = '${ApiConfig.baseURL}/patient/signIn';
  static const String verifyOtp = '${ApiConfig.baseURL}/patient/otpVerify';
}