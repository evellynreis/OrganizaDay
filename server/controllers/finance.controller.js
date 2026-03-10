const outlays = [];
const pays = [];

/**
 * Registrar uma nova despesa
 */
function registerOutlay(req, res) {
  const { description, money, date, paid } = req.body;

  if (!description || !money || !date) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  const newOutlay = {
    id: outlays.length + 1,
    description,
    money,
    date,
    paid: paid ?? false
  };

  outlays.push(newOutlay);

  return res.status(201).json({
    message: "Despesa registrada com sucesso.",
    outlay: newOutlay,
  });
}

/**
 * Registrar salário do mês
 */
function registerPay(req, res) {
  const { money, dateRegister } = req.body;

  if (!money || !dateRegister) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  const newPay = {
    id: pays.length + 1,
    money,
    dateRegister
  };

  pays.push(newPay);

  return res.status(201).json({
    message: "Salário registrado com sucesso.",
    pay: newPay
  });
}

/**
 * Listar todas as despesas
 */
function getAllOutlays(req, res) {
  return res.status(200).json({
    outlays
  });
}

/**
 * Listar todos os salários
 */
function getPay(req, res) {
  return res.status(200).json({
    pays
  });
}

/**
 * Resumo financeiro
 */
function getFinancialSummary(req, res) {

  const totalPay = pays.reduce((total, p) => total + Number(p.money), 0);

  const totalSpent = outlays
    .filter(o => o.paid === true)
    .reduce((total, o) => total + Number(o.money), 0);

  const totalPending = outlays
    .filter(o => o.paid === false)
    .reduce((total, o) => total + Number(o.money), 0);

  const balance = totalPay - totalSpent;

  return res.status(200).json({
    totalPay,
    totalSpent,
    totalPending,
    balance
  });
}

module.exports = {
  registerOutlay,
  registerPay,
  getAllOutlays,
  getPay,
  getFinancialSummary
};