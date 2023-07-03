class SendUniqueId {
  final String uniqueId;

  SendUniqueId({required this.uniqueId});

  Map<String, dynamic> toJson() {
    return {
      "aadharCardNumber": uniqueId
    };
  }
}

class VerifyOTPRequest {
  final String uniqueId;
  final String otp;

  VerifyOTPRequest({required this.uniqueId, required this.otp});

  Map<String, dynamic> toJson() {
    return {
      'aadharCardNumber': uniqueId,
      'otp': otp,
    };
  }
}

class VerifyOTPResponse {
  final String token;

  VerifyOTPResponse({required this.token});
  factory VerifyOTPResponse.fromJson(Map<String, dynamic> json) {
    return VerifyOTPResponse(
      token: json['token'],
    );
  }
}
