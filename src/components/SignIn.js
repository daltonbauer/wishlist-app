import React, { useState } from 'react';
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../firebase';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import '../styles/AuthStyles.css';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const requestCode = () => {
    auth.settings.appVerificationDisabledForTesting = true; // Only for local testing
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        alert("Code sent!");
      })
      .catch((error) => {
        console.error("Error sending code", error);
      });
  };

  const verifyCode = () => {
    if (!verificationId) return;
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    auth.signInWithCredential(credential)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error verifying code", error);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign In with Phone</h2>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <button className="auth-button" onClick={requestCode}>Send Code</button>

        {verificationId && (
          <>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
              />
            </div>
            <button className="auth-button" onClick={verifyCode}>Verify Code</button>
          </>
        )}

        {/* Sign Up link */}
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignIn;