function passwordValidation(form) {
  const { password, repeatedPassword } = form

  if (password !== repeatedPassword) {
    return {
      msg: 'Las contraseñas son diferentes',
      error: true
    }
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  if (password.length < 8 || !passwordRegex.test(password)) {
    return {
      msg: 'La contraseña debe cumplir con los siguientes requisitos:\n- Al menos 8 caracteres\n- Una letra mayúscula\n- Una letra minúscula\n- Un número.',
      error: true
    }
  }

  if (password.includes(' ')) {
    return {
      msg: 'La contraseña no debe contener espacios en blanco',
      error: true
    }
  }

  return null
}

export default passwordValidation
