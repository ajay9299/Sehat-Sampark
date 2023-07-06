import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/core/constants/AppColors.dart';
import 'package:sehat_sampark/features/auth/data/repository/auth_repository.dart';
import 'package:sehat_sampark/features/auth/data/repository/session_repository.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_event.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_state.dart';
import 'package:sehat_sampark/features/auth/presentation/otp_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final AuthBloc authBloc = AuthBloc(AuthRepository(), SessionManager());

  void _sendOTP(BuildContext context, String uniqueId) {
    final uniqueID = uniqueId.trim();
    authBloc.add(VerifyUniqueIdEvent(uniqueID));
  }

  TextEditingController uniqueIdController = TextEditingController();

  @override
  void dispose() {
    uniqueIdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => authBloc,
      child: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is AuthSuccessState) {
            // Add Success logic
            Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => OTPScreen(authBloc: authBloc, uniqueId: uniqueIdController.text.trim())));
          } else if (state is AuthErrorState) {
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: const Text('Error'),
                content: Text(state.error),
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
        child: Scaffold(
          key: const ValueKey(1),
          body: SafeArea(
            child: SingleChildScrollView(
              child: Container(
                height: MediaQuery.of(context).size.height,
                child: Column(
                  children: [
                    Expanded(
                      flex: 2,
                      child: Column(
                        children: [
                          Container(
                            margin: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 20),
                            child: Stack(
                              children: [
                                Center(
                                  child: Container(
                                    height: 240,
                                    constraints:
                                        const BoxConstraints(maxWidth: 500),
                                    margin: const EdgeInsets.only(top: 100),
                                    decoration: const BoxDecoration(
                                      color: Color(0xFFE1E0F5),
                                      borderRadius: BorderRadius.all(
                                        Radius.circular(30),
                                      ),
                                    ),
                                  ),
                                ),
                                Center(
                                  child: Container(
                                    constraints: const BoxConstraints(
                                      maxHeight: 340,
                                    ),
                                    margin: const EdgeInsets.symmetric(
                                      horizontal: 8,
                                    ),
                                    child: Image.asset('assets/img/login.png'),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.symmetric(horizontal: 10),
                            child: const Text(
                              'Sehat Samparak',
                              style: TextStyle(
                                  color: AppColors.primaryColor,
                                  fontSize: 30,
                                  fontWeight: FontWeight.w800),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: Column(
                        children: [
                          Container(
                              constraints: const BoxConstraints(maxWidth: 500),
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 10),
                              child: RichText(
                                textAlign: TextAlign.center,
                                text: const TextSpan(children: [
                                  TextSpan(
                                      text: 'We will send you an ',
                                      style: TextStyle(
                                          color: AppColors.primaryColor)),
                                  TextSpan(
                                      text: 'One time password ',
                                      style: TextStyle(
                                          color: AppColors.primaryColor,
                                          fontWeight: FontWeight.bold)),
                                  TextSpan(
                                      text: 'on this mobile number',
                                      style: TextStyle(
                                          color: AppColors.primaryColor)),
                                ]),
                              )),
                          Container(
                            height: 40,
                            constraints: const BoxConstraints(maxWidth: 500),
                            margin: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 10),
                            child: CupertinoTextField(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                              ),
                              decoration: const BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.all(
                                  Radius.circular(4),
                                ),
                              ),
                              controller: uniqueIdController,
                              clearButtonMode: OverlayVisibilityMode.editing,
                              keyboardType: TextInputType.phone,
                              maxLines: 1,
                              placeholder: '+91...',
                            ),
                          ),
                          Container(
                            margin: const EdgeInsets.symmetric(
                              horizontal: 20,
                              vertical: 10,
                            ),
                            constraints: const BoxConstraints(maxWidth: 500),
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.primaryColor,
                              ),
                              onPressed: () {
                                if (uniqueIdController.text.isNotEmpty) {
                                  _sendOTP(context, uniqueIdController.text);
                                } else {
                                  const SnackBar(
                                    behavior: SnackBarBehavior.floating,
                                    backgroundColor: Colors.red,
                                    content: Text(
                                      'Please enter a valid mobile number',
                                      style: TextStyle(color: Colors.white),
                                    ),
                                  );
                                }
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8, horizontal: 8),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text(
                                      'Next',
                                      style: TextStyle(color: Colors.white),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: const BoxDecoration(
                                        borderRadius: BorderRadius.all(
                                          Radius.circular(20),
                                        ),
                                        color: AppColors.primaryColorLight,
                                      ),
                                      child: const Icon(
                                        Icons.arrow_forward_ios,
                                        color: Colors.white,
                                        size: 16,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
