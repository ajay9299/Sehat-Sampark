import 'package:shared_preferences/shared_preferences.dart';

class SessionManager {
  static const String _tokenKey = 'user-token';

  Future<SharedPreferences> getSharedInstance() async {
    return await SharedPreferences.getInstance();
  }

  Future<void> saveToken(String token) async {
    final prefs = await getSharedInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<String?> getToken() async {
    final prefs = await getSharedInstance();
    return prefs.getString(_tokenKey);
  }

  Future<void> clearToken() async {
    final prefs = await getSharedInstance();
    await prefs.remove(_tokenKey);
  }
}