class Asset {
  const Asset({
    required this.name,
    required this.institution,
    required this.value,
    required this.detail,
  });

  final String name;
  final String institution;
  final int value;
  final String? detail;
}

class Debt {
  const Debt({
    required this.name,
    required this.total,
    required this.paid,
    required this.interest,
  });

  final String name;
  final int total;
  final int paid;
  final String? interest;
}

const assets = [
  Asset(
    name: 'Cuenta de Ahorros',
    institution: 'Bancolombia • **4921',
    value: 3500000,
    detail: null,
  ),
  Asset(
    name: 'Inversión en CDT',
    institution: 'Bancolombia',
    value: 8000000,
    detail: 'Rindiendo 12% E.A.',
  ),
];

const debts = [
  Debt(
    name: 'Crédito Educativo (ICETEX)',
    total: 12000000,
    paid: 3600000,
    interest: null,
  ),
  Debt(
    name: 'Tarjeta de Crédito',
    total: 1200000,
    paid: 0,
    interest: '2.4% Interés Mensual',
  ),
];

String formatCurrency(int value) {
  final digits = value.toString();
  final buffer = StringBuffer();
  for (var i = 0; i < digits.length; i++) {
    buffer.write(digits[i]);
    final remaining = digits.length - i - 1;
    if (remaining > 0 && remaining % 3 == 0) {
      buffer.write('.');
    }
  }
  return '\$${buffer.toString()} COP';
}
