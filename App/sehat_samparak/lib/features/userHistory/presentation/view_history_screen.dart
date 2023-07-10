import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sehat_sampark/features/userHistory/presentation/bloc/consultation_bloc.dart';
import 'package:sehat_sampark/features/userHistory/presentation/bloc/consultation_event.dart';
import 'package:sehat_sampark/features/userHistory/presentation/bloc/consultation_state.dart';

class ViewHistoryScreen extends StatefulWidget {
  const ViewHistoryScreen({super.key});

  @override
  State<ViewHistoryScreen> createState() => _ViewHistoryScreenState();
}

class _ViewHistoryScreenState extends State<ViewHistoryScreen> {
  late ConsultationBloc _consultationBloc;

  @override
  void initState() {
    super.initState();
    _consultationBloc = BlocProvider.of<ConsultationBloc>(context);
    _consultationBloc.add(const FetchConsultationHistoryEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('History'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: BlocBuilder<ConsultationBloc, ConsultationState>(
        builder: (context, state) {
          if (state is ConsultationLoadingState) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (state is ConsultationErrorState) {
            return const Center(
              child: Text('Failed to load history'),
            );
          } else if (state is ConsultationLoadedState) {
            if (state.consultationData.isNotEmpty) {
              final consultationData = state.consultationData;
              return SafeArea(
                child: ListView.builder(
                  padding: const EdgeInsets.all(8.0),
                  itemCount: consultationData.length,
                  itemBuilder: (context, index) {
                    final consultation = consultationData[index];
                    final doctor = consultation['Doctor'];

                    return Card(
                      elevation: 3,
                      child: ListTile(
                        title: Text('Doctor ID: ${consultation['doctorId']}'),
                        subtitle: Text('Date: ${consultation['createdAt']}'),
                        trailing: Text(
                          'Doctor: ${doctor['name']}',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              );
            } else {
              return const Center(
                child: Text('Currently, you have not consulted any doctor.'),
              );
            }
          } else {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
    );
  }
}
