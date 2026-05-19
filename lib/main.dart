import 'package:flutter/material.dart';

import 'data.dart';

const _primary = Color(0xFF014694);
const _primaryContainer = Color(0xFF2C5FAD);
const _secondary = Color(0xFF356380);
const _secondaryContainer = Color(0xFFAFDDFE);
const _surface = Color(0xFFFBF9F8);
const _surfaceLow = Color(0xFFF6F3F2);
const _surfaceHigh = Color(0xFFEAE8E7);
const _outline = Color(0xFF737782);
const _success = Color(0xFF2E8B57);
const _error = Color(0xFFBA1A1A);
const _tertiary = Color(0xFFFFBA2C);

void main() {
  runApp(const EonixApp());
}

class EonixApp extends StatefulWidget {
  const EonixApp({super.key});

  @override
  State<EonixApp> createState() => _EonixAppState();
}

class _EonixAppState extends State<EonixApp> {
  bool _welcomeVisible = true;
  int _currentIndex = 0;

  void _showMain([int index = 0]) {
    setState(() {
      _welcomeVisible = false;
      _currentIndex = index;
    });
  }

  void _showAlert() {
    showDialog<void>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('¡Alerta de mercado!'),
          content: const Text(
            'La canasta básica subió 12% en los próximos 6 meses. Ajusta tu presupuesto para mantener tu salud financiera.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Ajustar presupuesto'),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Ver impacto'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Eonix',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.light(
          primary: _primary,
          onPrimary: Colors.white,
          secondary: _secondary,
          onSecondary: Colors.white,
          surface: _surface,
          onSurface: const Color(0xFF1B1C1C),
          error: _error,
        ),
        scaffoldBackgroundColor: _surface,
      ),
      home: _welcomeVisible
          ? WelcomePage(onStart: _showMain)
          : MainShell(
              currentIndex: _currentIndex,
              onTabSelected: (index) => setState(() => _currentIndex = index),
              onBackToDashboard: () => setState(() => _currentIndex = 0),
              onShowAlert: _showAlert,
            ),
    );
  }
}

class MainShell extends StatelessWidget {
  const MainShell({
    super.key,
    required this.currentIndex,
    required this.onTabSelected,
    required this.onBackToDashboard,
    required this.onShowAlert,
  });

  final int currentIndex;
  final ValueChanged<int> onTabSelected;
  final VoidCallback onBackToDashboard;
  final VoidCallback onShowAlert;

  @override
  Widget build(BuildContext context) {
    final pages = [
      const DashboardPage(),
      const SimulationPage(),
      const LearningPage(),
      const ProfilePage(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Eonix'),
        leading: currentIndex == 0
            ? Padding(
                padding: const EdgeInsets.all(8),
                child: CircleAvatar(
                  backgroundColor: _surfaceHigh,
                  child: const Icon(Icons.person, color: _primary),
                ),
              )
            : IconButton(
                icon: const Icon(Icons.arrow_back, color: _primary),
                onPressed: onBackToDashboard,
              ),
        actions: [
          IconButton(
            onPressed: onShowAlert,
            icon: const Icon(Icons.notifications, color: _primary),
          ),
        ],
        backgroundColor: _surface,
        surfaceTintColor: _surface,
        elevation: 0,
      ),
      body: IndexedStack(index: currentIndex, children: pages),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        onTap: onTabSelected,
        selectedItemColor: _primary,
        unselectedItemColor: _outline,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet), label: 'Cartera'),
          BottomNavigationBarItem(icon: Icon(Icons.history), label: 'Simular'),
          BottomNavigationBarItem(icon: Icon(Icons.lightbulb_outline), label: 'Aprender'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Perfil'),
        ],
      ),
      floatingActionButton: currentIndex == 0
          ? FloatingActionButton.extended(
              onPressed: () {},
              backgroundColor: _tertiary,
              foregroundColor: Colors.black,
              icon: const Icon(Icons.add),
              label: const Text('Realizar Abono o Inversión'),
            )
          : null,
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key, required this.onStart});

  final VoidCallback onStart;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _surface,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 32),
              const Text(
                'Eonix',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 44,
                  fontWeight: FontWeight.bold,
                  color: _primary,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Toma el control de tu futuro financiero hoy.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
              ),
              const Spacer(),
              ElevatedButton.icon(
                onPressed: onStart,
                icon: const Icon(Icons.arrow_forward),
                label: const Text('Comenzar mi Simulación'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _primaryContainer,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 18),
                  textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
              TextButton(
                onPressed: onStart,
                child: const Text('¿Ya tienes cuenta? Inicia Sesión'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 120),
      children: [
        _SectionCard(
          title: 'Patrimonio Neto Total',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                '\$15.420.000 COP',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text('Crecimiento +8.4% este mes', style: TextStyle(color: _success)),
            ],
          ),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Distribución de capital',
          child: Column(
            children: const [
              SizedBox(height: 12),
              Text('Ratio 2:1 (Activos vs Deuda)', style: TextStyle(fontWeight: FontWeight.w600)),
              SizedBox(height: 12),
              LinearProgressIndicator(
                value: 0.66,
                color: _primary,
                backgroundColor: _surfaceHigh,
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        _SectionTitle(title: 'Mis Activos', subtitle: '\$11.500.000 COP'),
        const SizedBox(height: 12),
        ...assets.map(
          (asset) => _ListCard(
            title: asset.name,
            subtitle: asset.institution,
            trailing: formatCurrency(asset.value),
            badge: asset.detail,
            icon: Icons.savings,
          ),
        ),
        const SizedBox(height: 24),
        _SectionTitle(title: 'Mis Deudas', subtitle: '\$13.200.000 COP'),
        const SizedBox(height: 12),
        ...debts.map(
          (debt) => _ListCard(
            title: debt.name,
            subtitle: debt.interest ?? 'Crédito educativo',
            trailing: formatCurrency(debt.total),
            icon: Icons.credit_card,
          ),
        ),
        const SizedBox(height: 32),
        const Text(
          'Tu nivel de endeudamiento es del 40%. Intenta reducirlo para mejorar tu Score crediticio.',
          textAlign: TextAlign.center,
          style: TextStyle(color: _outline, fontWeight: FontWeight.w600),
        ),
      ],
    );
  }
}

class SimulationPage extends StatefulWidget {
  const SimulationPage({super.key});

  @override
  State<SimulationPage> createState() => _SimulationPageState();
}

class _SimulationPageState extends State<SimulationPage> {
  String? _selection;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 120),
      children: [
        const Text(
          'Tu Futuro Financiero',
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: _primaryContainer),
        ),
        const SizedBox(height: 12),
        const Text('Proyección de riqueza simulada', style: TextStyle(color: _outline)),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Patrimonio proyectado',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('\$100.4M COP', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              SizedBox(height: 12),
              LinearProgressIndicator(value: 0.75, color: _primaryContainer),
            ],
          ),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Decisión: Movilidad Urbana',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '¿Comprarías un auto usado con un préstamo de alto interés o usarías el transporte público?',
              ),
              const SizedBox(height: 16),
              Wrap(
                spacing: 12,
                children: [
                  ChoiceChip(
                    label: const Text('Comprar Auto Usado'),
                    selected: _selection == 'auto',
                    onSelected: (_) => setState(() => _selection = 'auto'),
                  ),
                  ChoiceChip(
                    label: const Text('Transporte Público + Ahorro'),
                    selected: _selection == 'transporte',
                    onSelected: (_) => setState(() => _selection = 'transporte'),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            backgroundColor: _tertiary,
            foregroundColor: Colors.black,
            padding: const EdgeInsets.symmetric(vertical: 18),
          ),
          child: const Text('Confirmar decisión'),
        ),
      ],
    );
  }
}

class LearningPage extends StatelessWidget {
  const LearningPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 120),
      children: [
        _SectionCard(
          title: 'Interés Compuesto',
          child: const Text(
            'Tu dinero no solo creció; comenzó a generar su propio dinero. Así es como los pequeños ahorros se convierten en fortunas.',
          ),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'La fórmula de crecimiento',
          child: const Text('Inversión + Tiempo = Crecimiento exponencial.'),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Tip local',
          child: const Text('En Colombia, busca CDTs o fondos que capitalicen intereses mensualmente.'),
        ),
        const SizedBox(height: 24),
        ElevatedButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.arrow_forward),
          label: const Text('Volver a la Simulación'),
          style: ElevatedButton.styleFrom(
            backgroundColor: _tertiary,
            foregroundColor: Colors.black,
            padding: const EdgeInsets.symmetric(vertical: 18),
          ),
        ),
      ],
    );
  }
}

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 120),
      children: [
        _SectionCard(
          title: 'Estratega de Ahorro',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Nivel 5', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              SizedBox(height: 8),
              LinearProgressIndicator(value: 0.75, color: _success),
            ],
          ),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Logros desbloqueados',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('• Blindaje Financiero'),
              Text('• Primer Inversionista'),
              Text('• Propietario (bloqueado)'),
            ],
          ),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Estadísticas',
          child: const Text('12 simulaciones · 34 lecciones'),
        ),
        const SizedBox(height: 20),
        _SectionCard(
          title: 'Dificultad de simulación',
          child: const Text('Intermedio'),
        ),
      ],
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.title, required this.subtitle});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: _primary)),
        Text(subtitle, style: const TextStyle(color: _outline)),
      ],
    );
  }
}

class _SectionCard extends StatelessWidget {
  const _SectionCard({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: _surfaceLow,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: _outline),
            ),
            const SizedBox(height: 12),
            child,
          ],
        ),
      ),
    );
  }
}

class _ListCard extends StatelessWidget {
  const _ListCard({
    required this.title,
    required this.subtitle,
    required this.trailing,
    required this.icon,
    this.badge,
  });

  final String title;
  final String subtitle;
  final String trailing;
  final IconData icon;
  final String? badge;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: _surfaceHigh,
              child: Icon(icon, color: _primary),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(color: _outline, fontSize: 12)),
                  if (badge != null)
                    Container(
                      margin: const EdgeInsets.only(top: 6),
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: _success.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        badge!,
                        style: const TextStyle(fontSize: 10, color: _success, fontWeight: FontWeight.bold),
                      ),
                    ),
                ],
              ),
            ),
            Text(trailing, style: const TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}
