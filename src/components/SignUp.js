import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import '../styles/AuthStyles.css';

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const requestCode = () => {
    auth.settings.appVerificationDisabledForTesting = true; // Only for testing
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        alert("Verification code sent to your phone!");
      })
      .catch((error) => {
        console.error("Error sending code:", error);
      });
  };

  const verifyCode = () => {
    if (!verificationId) return;
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    auth.signInWithCredential(credential)
      .then(() => {
        navigate('/'); // Navigate to the homepage or dashboard after sign-up
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign Up with Phone</h2>

        {/* Phone Number Input */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <button className="auth-button" onClick={requestCode}>Send Code</button>

        {/* Verification Code Input */}
        {verificationId && (
          <>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the verification code"
              />
            </div>
            <button className="auth-button" onClick={verifyCode}>Verify & Sign Up</button>
          </>
        )}

        {/* Sign In link */}
        <p className="auth-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignUp;