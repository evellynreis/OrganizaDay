function loginUser(req, res) {
  const { email, password } = req.body;

  if (email === "admin@email.com" && password === "123456") {
    return res.json({
      message: "Login realizado com sucesso",
      user: {
        email,
      },
    });
  }

  return res.status(401).json({
    message: "Credenciais inválidas",
  });
}

module.exports = {
  loginUser
};