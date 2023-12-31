import 'package:shared_preferences/shared_preferences.dart';

class ApiConfig {
  static const String baseURL = 'http://10.0.2.2:3001/v1/api';
  // static const Map<String, String> headers = {
  //   'Content-type': 'application/json',
  //   'Authorization': 'Bearer <token_here>',
  // };

  static Future<Map<String, String>> get headers async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('user-token');

    return {
      'Content-type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }
}
