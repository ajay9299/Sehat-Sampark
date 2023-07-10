import 'package:http/http.dart' as http;
import 'package:sehat_sampark/core/config/api_config.dart';
import 'package:sehat_sampark/core/constants/api_constant.dart';

class MedicalHistoryRepository {
  /// Fetch the user previous consultation history from the token
  ///
  /// Returns [http.Response]
  Future<http.Response> fetchUserConsultationHistory() async {
    final response = await http.get(
      Uri.parse(ApiConstant.consultHistory),
      headers: await ApiConfig.headers,
    );

    return response;
  }
}
