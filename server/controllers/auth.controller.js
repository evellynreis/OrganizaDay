const { users } = require("./register.controller");

/**
 * Realizar login de usuário.
 */
function loginUser(req, res) {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!email || !password) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Senha incorreta.",
    });
  }

  if (user && user.password === password) {
    return res.json({
      message: "Login realizado com sucesso.",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  }

  return res.status(401).json({
    message: "Credenciais inválidas.",
  });
}

module.exports = {
  loginUser,
};
