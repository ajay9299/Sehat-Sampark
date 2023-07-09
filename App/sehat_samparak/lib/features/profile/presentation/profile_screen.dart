import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/core/constants/AppColors.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_bloc.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_event.dart';
import 'package:sehat_sampark/features/profile/presentation/bloc/user_state.dart';
import 'package:sehat_sampark/features/profile/presentation/edit_profile_screen.dart';
import 'package:sehat_sampark/features/profile/presentation/widget/age_calculator_widget.dart';

class UserProfileScreen extends StatefulWidget {
  const UserProfileScreen({super.key});

  @override
  State<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  late UserBloc _userBloc;

  @override
  void initState() {
    super.initState();

    _userBloc = BlocProvider.of<UserBloc>(context);
    _userBloc.add(const UserProfileEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Profile',
        ),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
        elevation: 0,
      ),
      body: BlocBuilder<UserBloc, UserState>(builder: (context, state) {
        if (state is UserSuccessState) {
          return SingleChildScrollView(
            child: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.redAccent, Colors.pinkAccent],
                      ),
                    ),
                    child: Container(
                      width: double.infinity,
                      height: 350,
                      child: Center(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const CircleAvatar(
                              backgroundColor: Colors.white,
                              radius: 44,
                              child: Icon(
                                Icons.person,
                                size: 50,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(
                              height: 30,
                            ),
                            Text(
                              state.user.name!,
                              style: const TextStyle(
                                fontSize: 22.0,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 5.0,
                            ),
                            Text(
                              'UId - ${state.user.uidNumber!}',
                              style: const TextStyle(
                                fontSize: 18.0,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 10.0,
                            ),
                            Card(
                              margin: const EdgeInsets.symmetric(
                                horizontal: 20,
                                vertical: 5,
                              ),
                              clipBehavior: Clip.antiAlias,
                              color: Colors.white,
                              elevation: 5.0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      TextButton(
                                        child: const Text(
                                          'Edit',
                                          style: TextStyle(
                                            decoration:
                                                TextDecoration.underline,
                                            fontSize: 18,
                                            color: AppColors.primaryColor,
                                          ),
                                        ),
                                        onPressed: () {
                                          Navigator.of(context).push(
                                            MaterialPageRoute(
                                              builder: (_) => EditProfileScreen(
                                                height: state.user.height!,
                                                weight: state.user.weight!,
                                                bloodGroup:
                                                    state.user.bloodGroup!,
                                              ),
                                            ),
                                          );
                                        },
                                      ),
                                    ],
                                  ),
                                  Padding(
                                    padding:
                                        const EdgeInsets.fromLTRB(8, 0, 8, 8),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Expanded(
                                          child: Column(
                                            children: [
                                              const Text(
                                                'Height(in ft)',
                                                style: TextStyle(
                                                  color: Colors.redAccent,
                                                  fontSize: 20,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 8,
                                              ),
                                              Text(
                                                state.user.height ?? "-",
                                                style: const TextStyle(
                                                  fontSize: 18,
                                                  color: Colors.pinkAccent,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Expanded(
                                          child: Column(
                                            children: <Widget>[
                                              const Text(
                                                "Weight",
                                                style: TextStyle(
                                                  color: Colors.redAccent,
                                                  fontSize: 20.0,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 5.0,
                                              ),
                                              Text(
                                                state.user.weight ?? "-",
                                                style: const TextStyle(
                                                  fontSize: 18.0,
                                                  color: Colors.pinkAccent,
                                                ),
                                              )
                                            ],
                                          ),
                                        ),
                                        Expanded(
                                          child: Column(
                                            children: <Widget>[
                                              const Text(
                                                "Blood Group",
                                                style: TextStyle(
                                                  color: Colors.redAccent,
                                                  fontSize: 20.0,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              const SizedBox(
                                                height: 5.0,
                                              ),
                                              Text(
                                                state.user.bloodGroup ?? "-",
                                                style: const TextStyle(
                                                  fontSize: 18.0,
                                                  color: Colors.pinkAccent,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
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
                  Container(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 20, horizontal: 16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                //crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      const Text(
                                        'Age',
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontStyle: FontStyle.normal,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 20,
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 10,
                                      ),
                                      AgeCalculator(dobFromAPI: state.user.dob)
                                    ],
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  const Text(
                                    'Gender',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontStyle: FontStyle.normal,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                                  ),
                                  const SizedBox(
                                    width: 10,
                                  ),
                                  Text(
                                    state.user.gender!,
                                    style: const TextStyle(
                                      color: Colors.black,
                                      fontStyle: FontStyle.normal,
                                      fontSize: 20,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 24,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text(
                                'Phone',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontStyle: FontStyle.normal,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                              Container(
                                height: 40,
                                width: 200,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 8,
                                ),
                                constraints:
                                    const BoxConstraints(maxWidth: 500),
                                decoration: BoxDecoration(
                                  color: Colors.grey.withOpacity(0.1),
                                  border: Border.all(
                                    width: 1,
                                    color: AppColors.primaryColor,
                                  ),
                                  borderRadius: const BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                child: Text(
                                  state.user.phoneNumber!,
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontStyle: FontStyle.normal,
                                    fontSize: 20,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 24,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text(
                                'Email',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontStyle: FontStyle.normal,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                              Container(
                                height: 40,
                                width: 200,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 8,
                                ),
                                constraints:
                                    const BoxConstraints(maxWidth: 500),
                                decoration: BoxDecoration(
                                  color: Colors.grey.withOpacity(0.1),
                                  border: Border.all(
                                    width: 1,
                                    color: AppColors.primaryColor,
                                  ),
                                  borderRadius: const BorderRadius.all(
                                    Radius.circular(10),
                                  ),
                                ),
                                child: Text(
                                  state.user.email!,
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontStyle: FontStyle.normal,
                                    fontSize: 20,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 24,
                          ),
                          const Text(
                            'Address',
                            style: TextStyle(
                              color: Colors.black,
                              fontStyle: FontStyle.normal,
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Container(
                            width: MediaQuery.of(context).size.width,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 8,
                            ),
                            //constraints: const BoxConstraints(maxWidth: 500),
                            decoration: BoxDecoration(
                              color: Colors.grey.withOpacity(0.1),
                              border: Border.all(
                                width: 1,
                                color: AppColors.primaryColor,
                              ),
                              borderRadius: const BorderRadius.all(
                                Radius.circular(10),
                              ),
                            ),
                            child: const Text(
                              '104, 2, Jolly Maker Chamber, Nariman Point opp. Baju circle rd, Mumbai, Maharashtra, India',
                              style: TextStyle(
                                color: Colors.black,
                                fontStyle: FontStyle.normal,
                                fontSize: 20,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        } else if (state is UserErrorState) {
          return Center(
            child: Text('Error: ${state.error}'),
          );
        } else if (state is UserLoadingState) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      }),
    );
  }
}
