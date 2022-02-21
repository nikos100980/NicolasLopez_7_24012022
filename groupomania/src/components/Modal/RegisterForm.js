import React from 'react';

const RegisterForm = () => {
    return (
        <div>
            <form>
                <div className="form-group">
                  <input type="text" placeholder="Nom" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Prénom" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Adresse email" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Mot de passe" />
                </div>
                <div className="form-group">
                  <input type="submit" value="S'inscrire" />
                </div>
              </form>
        </div>
    );
};

export default RegisterForm;