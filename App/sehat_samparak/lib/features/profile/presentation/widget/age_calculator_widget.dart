import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class AgeCalculator extends StatelessWidget {
  const AgeCalculator({required this.dobFromAPI, super.key});

  final String? dobFromAPI;

  int _calculateAge(String dobFromAPI) {
    final DateTime currentDate = DateTime.now();
    DateFormat dateFormat = DateFormat("dd-MM-yyyy");
    DateTime dob = dateFormat.parse(dobFromAPI);
    int age = currentDate.year - dob.year;

    if (currentDate.month < dob.month ||
        (currentDate.month == dob.month && currentDate.day < dob.day)) {
      age--;
    }
    return age;
  }

  @override
  Widget build(BuildContext context) {
    int age = _calculateAge(dobFromAPI!);
    return Text(
      '$age',
      style: const TextStyle(
        color: Colors.black,
        fontStyle: FontStyle.normal,
        fontSize: 20,
      ),
    );
  }
}
