// Middleware para validar dados do usuário
export const validateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  
  // Validar campos obrigatórios
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Nome e email são obrigatórios' 
    });
  }
  
  // Validar formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Email inválido' 
    });
  }
  
  // Validar idade (se fornecida)
  if (age && (typeof age !== 'number' || age < 0 || age > 150)) {
    return res.status(400).json({ 
      error: 'Idade deve ser um número entre 0 e 150' 
    });
  }
  
  next();
};

// Middleware para validar ID
export const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ 
      error: 'ID deve ser um número positivo' 
    });
  }
  
  req.params.id = id; // Garantir que o ID seja número
  next();
};