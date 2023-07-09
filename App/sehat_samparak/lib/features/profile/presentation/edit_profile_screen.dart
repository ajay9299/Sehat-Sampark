import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/core/constants/AppColors.dart';
import 'package:sehat_sampark/features/profile/data/repository/user_repository.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/edit_profile/edit_profile_bloc.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/edit_profile/edit_profile_event.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/edit_profile/edit_profile_state.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key, required this.height, required this.weight, required this.bloodGroup});

  final String height;
  final String weight;
  final String bloodGroup;

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  late EditProfileBloc _editProfileBloc;
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _heightController = TextEditingController();
  final TextEditingController _weightController = TextEditingController();

  String? _selectedBloodGroup;

  final List<String> bloodGroupOptions = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];

  @override
  void initState() {
    super.initState();
    _editProfileBloc = BlocProvider.of<EditProfileBloc>(context);

    _heightController.text = widget.height;
    _weightController.text = widget.weight;
    _selectedBloodGroup = widget.bloodGroup;
  }

  @override
  void dispose() {
    _editProfileBloc.close();
    _heightController.dispose();
    _weightController.dispose();
    super.dispose();
  }

  void _saveProfile(String height, String weight, String? bloodGroup) {
    _editProfileBloc.add(SaveProfileEvent(height, weight, bloodGroup));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Profile'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: BlocListener<EditProfileBloc, EditProfileState>(
        listener: (context, state) {
          if (state is EditProfileSaved) {
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Profile saved successfully')),
            );
          } else if (state is EditProfileError) {
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: const Text('Error'),
                content: Text(state.message),
                actions: [
                  TextButton(
                    child: const Text('OK'),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
            );
          }
        },
        child: BlocBuilder<EditProfileBloc, EditProfileState>(
          builder: (context, state) {
            return SafeArea(
              child: Form(
                key: _formKey,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      TextFormField(
                        decoration: const InputDecoration(labelText: 'Height(in ft)'),
                        //initialValue: '6',
                        controller: _heightController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a valid height';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 6),
                      TextFormField(
                        decoration: const InputDecoration(labelText: 'Weight(in kg)'),
                        //initialValue: '55',
                        controller: _weightController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a valid weight in kg';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 6),
                      DropdownButtonFormField(
                        value: _selectedBloodGroup,
                        onChanged: (String? newValue) {
                          setState(() {
                            _selectedBloodGroup = newValue;
                          });
                        },
                        items: bloodGroupOptions.map((String bloodGroup) {
                          return DropdownMenuItem<String>(
                            value: bloodGroup,
                            child: Text(bloodGroup),
                          );
                        }).toList(),
                        decoration: const InputDecoration(labelText: 'Blood Group'),
                        validator: (String? value) {
                          if (value == null || value.isEmpty) {
                            return 'Please select your blood group';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 16.0),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          backgroundColor: Colors.red,
                        ),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            final height = _heightController.text;
                            final weight = _weightController.text;
                            _saveProfile(height, weight, _selectedBloodGroup);
                          }
                        },
                        child: const Text('Save'),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }
        ),
      ),
    );
  }
}
