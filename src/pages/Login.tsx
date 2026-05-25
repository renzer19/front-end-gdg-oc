// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response: any = await authAPI.login(email, password);
            
            login(response.data.data); 
            navigate('/dashboard');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login gagal! Cek koneksi backend.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '5px', color: '#1e293b' }}>Welcome Back 👋</h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                    Silakan login ke sistem
                </p>
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="email" 
                        placeholder="Email (ketik 'admin' untuk role admin)" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        style={styles.input} required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        style={styles.input} required 
                    />
                    <button type="submit" disabled={isLoading} style={styles.primaryBtn}>
                        {isLoading ? 'Memproses...' : 'Login'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
                    Belum punya akun? <Link to="/register" style={styles.link}>Daftar di sini</Link>
                </p>
            </div>
        </div>
    );
};

export const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '380px' },
    input: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', transition: 'border 0.3s' },
    primaryBtn: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s' },
    link: { color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }
};