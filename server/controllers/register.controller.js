const users = [];

/**
 * Registrar usuário.
 */
function registerUser(req, res) {
  const { nome, dateBirthday, email, password } = req.body;

  if (!nome || !dateBirthday || !email || !password) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "E-mail já cadastrado.",
    });
  }

  const newUser = {
    id: users.length + 1,
    nome,
    dateBirthday,
    email,
    password,
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Usuário registrado com sucesso.",
    user: newUser,
  });
}

/**
 * Listar todos os usuários.
 */
function getAllUsers(req, res) {
  return res.status(200).json({
    users,
  });
}

/**
 * Buscar usuário específico.
 */
function getRegisterUser(req, res) {
  const { email } = req.params;

  const user = users.find((u) => u.email == email);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  return res.status(200).json({
    user,
  });
}

module.exports = {
  registerUser,
  getAllUsers,
  getRegisterUser,
};
