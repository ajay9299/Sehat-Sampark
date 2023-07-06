import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'package:sehat_sampark/core/constants/AppColors.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_event.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_state.dart';
import 'package:sehat_sampark/features/profile/data/repository/user_repository.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_bloc.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_event.dart';
import 'package:sehat_sampark/features/profile/presentation/profile_screen.dart';

class OTPScreen extends StatefulWidget {
  const OTPScreen({super.key, required this.uniqueId, required this.authBloc});

  final String uniqueId;
  final AuthBloc authBloc;

  @override
  State<OTPScreen> createState() => _OTPScreenState();
}

class _OTPScreenState extends State<OTPScreen> {
  //String text = '';
  final TextEditingController _otpController = TextEditingController();
  String currentText = "";
  final UserBloc userBloc = UserBloc(UserRepository());

  void _verifyOTP(BuildContext context, String otp) {
    widget.authBloc.add(VerifyOtpEvent(widget.uniqueId, otp, userBloc));
  }

  @override
  void dispose() {
    _otpController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => widget.authBloc,
      child: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is AuthOtpVerificationSuccess) {
            debugPrint("Successful verification");
            final UserBloc userBloc = UserBloc(UserRepository());
            Navigator.of(context)
                .push(MaterialPageRoute(builder: (_) => const UserProfileScreen()));
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
          } else if (state is AuthLoadingState) {
            const CircularProgressIndicator();
          }
        },
        child: Scaffold(
          backgroundColor: Colors.white,
          key: const ValueKey(2),
          appBar: AppBar(
            leading: IconButton(
              icon: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(Radius.circular(20)),
                  color: AppColors.primaryColorLight.withAlpha(20),
                ),
                child: const Icon(
                  Icons.arrow_back_ios,
                  color: AppColors.primaryColor,
                  size: 16,
                ),
              ),
              onPressed: () => Navigator.of(context).pop(),
            ),
            elevation: 0,
            backgroundColor: Colors.white,
          ),
          body: SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              margin: const EdgeInsets.symmetric(horizontal: 20),
                              child: const Text(
                                'Enter a 6 digit verification code sent to your number',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 26,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                            Container(
                              margin: const EdgeInsets.symmetric(horizontal: 20),
                              constraints: const BoxConstraints(
                                maxWidth: 500,
                              ),
                              child: PinCodeTextField(
                                appContext: context,
                                length: 6,
                                autoFocus: true,
                                controller: _otpController,
                                autoDisposeControllers: false,
                                cursorColor: AppColors.primaryColor,
                                pinTheme: PinTheme(
                                  inactiveColor: Colors.grey,
                                  activeColor: AppColors.primaryColorLight,
                                  borderWidth: 4,
                                  shape: PinCodeFieldShape.box,
                                  borderRadius: BorderRadius.circular(8),
                                  fieldHeight: 50,
                                  fieldWidth: 50,
                                  activeFillColor: Colors.black,
                                ),
                                onChanged: (value) {
                                  debugPrint(value);
                                  setState(() {
                                    currentText = value;
                                  });
                                },
                                onCompleted: (v) {
                                  debugPrint("Completed");

                                  _verifyOTP(context, _otpController.text);
                                },
                              ),
                            ),
                          ],
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
                            shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.all(Radius.circular(14)),
                            ),
                          ),
                          onPressed: () {
                            debugPrint("OTP Verified");
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              vertical: 8,
                              horizontal: 8,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  'Confirm',
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
                      // NumericKeyboard(
                      //   onKeyboardTap: _onKeyboardTap,
                      //   textColor: AppColors.primaryColorLight,
                      //   rightIcon: const Icon(
                      //     Icons.backspace,
                      //     color: AppColors.primaryColorLight,
                      //   ),
                      //   rightButtonFn: () {
                      //     setState(() {
                      //       text = text.substring(0, text.length - 1);
                      //     });
                      //   },
                      // ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
