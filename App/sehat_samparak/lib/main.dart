import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/features/auth/data/repository/auth_repository.dart';
import 'package:sehat_sampark/features/auth/data/repository/session_repository.dart';
import 'package:sehat_sampark/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:sehat_sampark/features/auth/presentation/login_screen.dart';
import 'package:sehat_sampark/features/profile/presentation/profile_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthBloc>(create: (_) => AuthBloc(UserRepository(), SessionManager()),)
      ],
      child: MaterialApp(
        title: 'Sehat Samparak',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        // home: const MyHomePage(title: 'Sehat Samparak'),
        home: FutureBuilder<SharedPreferences>(
          future: SharedPreferences.getInstance(),
          builder: (context, AsyncSnapshot<SharedPreferences> snapshot) {
            if (snapshot.hasData) {
              final SharedPreferences prefs = snapshot.data!;
              if (prefs.containsKey('user-token')) {
                // Token is present, navigate to Profile Screen
                return const UserProfileScreen();
              } else {
                // Token is not present, navigate to Login Screen
                return const LoginScreen();
              }
            } else {
              return const Scaffold(
                body: Center(child: CircularProgressIndicator(),),
              );
            }
          },
        )
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Center(
          child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (_) => const LoginScreen()),
                  (Route<dynamic> route) => false);
            },
            child: const Text('Login'),
          ),
        ));
  }
}
