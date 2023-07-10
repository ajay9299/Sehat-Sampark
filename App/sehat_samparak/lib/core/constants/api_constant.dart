import 'package:sehat_sampark/core/config/api_config.dart';

class ApiConstant {
  static const String signIn = '${ApiConfig.baseURL}/patient/signIn';
  static const String verifyOtp = '${ApiConfig.baseURL}/patient/otpVerify';
  static const String myProfile = '${ApiConfig.baseURL}/patient/myProfile';
  static const String updateProfile = '${ApiConfig.baseURL}/patient';
  static const String consultHistory = '${ApiConfig.baseURL}/patient/health/history';

}