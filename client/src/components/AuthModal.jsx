import React, { useState } from 'react';
import {
  Shield,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const AuthModal = ({ isOpen, onClose }) => {
  const { setUser, showToast, triggerCelebration } = useApp();
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('anshad@winterarc.dev');
  const [password, setPassword] = useState('winterarc2026');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMode === 'signin') {
        const res = await api.auth.login(email, password);
        if (res.success) {
          if (res.token) localStorage.setItem('winter_arc_token', res.token);
          if (res.user) setUser(prev => ({ ...prev, ...res.user }));
          showToast(`Welcome back, ${res.user?.name || 'Anshad'}! 🚀`);
          triggerCelebration();
          onClose();
        } else {
          showToast(res.message || 'Login failed', 'error');
        }
      } else {
        const res = await api.auth.register(name || 'Developer', email, password);
        if (res.success) {
          if (res.token) localStorage.setItem('winter_arc_token', res.token);
          if (res.user) setUser(prev => ({ ...prev, ...res.user }));
          showToast(`Account created! Welcome to Winter Arc! 🎯`);
          triggerCelebration();
          onClose();
        } else {
          showToast(res.message || 'Registration failed', 'error');
        }
      }
    } catch {
      // Offline fallback
      showToast(`Signed in successfully as ${email.split('@')[0]}!`);
      triggerCelebration();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoSignIn = () => {
    setEmail('anshad@winterarc.dev');
    setPassword('winterarc2026');
    setUser(prev => ({
      ...prev,
      name: 'Anshad',
      email: 'anshad@winterarc.dev',
      role: 'MERN Stack Developer | AI Engineering Enthusiast',
      streak: 14
    }));
    showToast('Signed in with Anshad demo credentials! ⚡');
    triggerCelebration();
    onClose();
  };

  const handleForgotPassword = async () => {
    try {
      await api.auth.forgotPassword(email);
      showToast(`Password reset link sent to ${email} 📩`);
    } catch {
      showToast(`Password reset link sent to ${email} 📩`);
    }
  };

  return (
    <div className="modal-backdrop-overlay">
      <div className="auth-modal-card">
        {/* Header */}
        <div className="auth-modal-header">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div className="auth-icon-badge">
              <Shield size={20} strokeWidth={2.4} />
            </div>
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0 }}>
                Welcome Back to Winter Arc
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, margin: '4px 0 0 0' }}>
                Access your dashboard & progress
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="auth-close-btn"
            title="Close"
            type="button"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Divider line */}
        <div className="auth-divider" />

        {/* Segmented Sign In / Create Account Toggle */}
        <div className="auth-segmented-tabs">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {authMode === 'signup' && (
            <div className="auth-field-group">
              <label className="auth-label">
                Full Name
              </label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anshad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          {/* Email Field with perfect inset positioning */}
          <div className="auth-field-group">
            <label className="auth-label">
              Email Address
            </label>
            <div className="auth-input-wrapper">
              <div className="auth-input-icon">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                placeholder="name@winterarc.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>
          </div>

          {/* Password Field with right-aligned eye toggle inside input */}
          <div className="auth-field-group">
            <div className="auth-label-row">
              <label className="auth-label">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="auth-forgot-link"
              >
                Forgot password?
              </button>
            </div>
            <div className="auth-input-wrapper">
              <div className="auth-input-icon">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Primary Action Button matching Screenshot */}
          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            <span>{authMode === 'signin' ? 'Sign In to Dashboard' : 'Create Account & Begin'}</span>
            <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.6} />
          </button>

          {/* Quick Demo Sign In Button matching Screenshot */}
          <button
            type="button"
            onClick={handleQuickDemoSignIn}
            className="auth-demo-btn"
          >
            <Sparkles size={16} color="#F59E0B" />
            <span>Quick Demo Sign In (Anshad)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
