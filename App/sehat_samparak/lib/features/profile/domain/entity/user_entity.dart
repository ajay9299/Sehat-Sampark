/// The UserId is an important concept in our app
/// so it deserves a type of its own
//typedef UIdNumber = String;

class UserEntity {
  String? uidNumber;
  String? name;
  String? dob;
  String? gender;
  String? phoneNumber;
  String? email;
  String? state;
  String? district;
  String? subDistrict;
  String? street;
  String? pinCode;
  String? weight;
  String? height;
  String? bloodGroup;
  String? createdAt;
  String? updatedAt;

  UserEntity({
    this.uidNumber,
    this.name,
    this.dob,
    this.gender,
    this.phoneNumber,
    this.email,
    this.state,
    this.district,
    this.subDistrict,
    this.street,
    this.pinCode,
    this.weight,
    this.height,
    this.bloodGroup,
    this.createdAt,
    this.updatedAt,
  });

  UserEntity.fromJson(Map<String, dynamic> json) {
    uidNumber = json['uidNumber'];
    name = json['name'];
    dob = json['dob'];
    gender = json['gender'];
    phoneNumber = json['phoneNumber'];
    email = json['email'];
    state = json['state'];
    district = json['district'];
    subDistrict = json['subDistrict'];
    street = json['street'];
    pinCode = json['pinCode'];
    weight = json['weight'];
    height = json['height'];
    bloodGroup = json['bloodGroup'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['uidNumber'] = uidNumber;
    data['name'] = name;
    data['dob'] = dob;
    data['gender'] = gender;
    data['phoneNumber'] = phoneNumber;
    data['email'] = email;
    data['state'] = state;
    data['district'] = district;
    data['subDistrict'] = subDistrict;
    data['street'] = street;
    data['pinCode'] = pinCode;
    data['weight'] = weight;
    data['height'] = height;
    data['bloodGroup'] = bloodGroup;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    return data;
  }
}
