import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:eonix/main.dart';

void main() {
  testWidgets('App muestra pantalla de bienvenida', (WidgetTester tester) async {
    await tester.pumpWidget(const EonixApp());

    expect(find.text('Eonix'), findsWidgets);
    expect(find.text('Comenzar mi Simulación'), findsOneWidget);
  });
}
