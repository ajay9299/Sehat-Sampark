import 'package:flutter/material.dart';
import 'package:sehat_sampark/core/constants/AppColors.dart';
import 'package:sehat_sampark/features/auth/presentation/login_screen.dart';
import 'package:sehat_sampark/features/home/presentation/future_screen.dart';
import 'package:sehat_sampark/features/profile/presentation/profile_screen.dart';
import 'package:sehat_sampark/features/userHistory/presentation/view_history_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sehat Samparak'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            ListTile(
              title: Text('Logout'),
              onTap: () async {
                // SharedPreferences prefs = await SharedPreferences.getInstance();
                // await prefs.remove('user-token');
                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const LoginScreen(),
                  ),
                  (Route<dynamic> route) => false,
                );
              },
            ),
          ],
        ),
      ),
      body: const SafeArea(
          child: Row(
        children: [
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RectangularBox(
                  name: 'View History',
                  destination: ViewHistoryScreen(),
                ),
                SizedBox(height: 16),
                RectangularBox(
                  name: 'View Profile',
                  destination: UserProfileScreen(),
                ),
              ],
            ),
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RectangularBox(
                  name: 'Future tab',
                  destination: FutureScreen(),
                ),
                SizedBox(height: 16),
                RectangularBox(
                  name: 'Future tab',
                  destination: FutureScreen(),
                ),
              ],
            ),
          ),
        ],
      )),
    );
  }
}

class RectangularBox extends StatelessWidget {
  final String name;
  final Widget destination;

  const RectangularBox(
      {super.key, required this.name, required this.destination});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => destination),
        );
      },
      child: Container(
        width: 150,
        height: 100,
        decoration: BoxDecoration(
          color: AppColors.primaryColor,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(
          child: Text(
            name,
            style: const TextStyle(
                color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}
