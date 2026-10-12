import 'package:flutter_test/flutter_test.dart';
import 'package:myportfolioapp/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets('shows the sign in screen', (WidgetTester tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(const PortfolioEditorApp());
    await tester.pumpAndSettle();

    expect(find.text('Sign in'), findsOneWidget);
    expect(find.text('Portfolio editor'), findsOneWidget);
  });
}
