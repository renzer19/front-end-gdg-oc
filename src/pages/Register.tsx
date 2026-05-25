import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';
import { styles } from './Login'; 
export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const parsedAge = age ? Number(age) : undefined;
            await authAPI.register({ name, email, role, age: parsedAge, password });
            alert('Akun berhasil dibuat! Data sudah masuk ke Firestore.');
            navigate('/');
        } catch (error: any) {
            alert(`Gagal membuat akun: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '5px', color: '#1e293b' }}>Buat Akun ✨</h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                    Daftar untuk mencoba simulasi Role
                </p>
                
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="Nama Lengkap" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        style={styles.input} required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
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
                    <input 
                        type="number" 
                        placeholder="Umur (opsional)" 
                        value={age}
                        onChange={e => setAge(e.target.value)} 
                        style={styles.input} 
                    />
                    
                    <select value={role} onChange={e => setRole(e.target.value)} style={{...styles.input, cursor: 'pointer'}}>
                        <option value="user">Daftar sebagai User</option>
                        <option value="super admin">Daftar sebagai Super Admin</option>
                    </select>

                    <button type="submit" disabled={isLoading} style={styles.primaryBtn}>
                        {isLoading ? 'Menyimpan...' : 'Register'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
                    Sudah punya akun? <Link to="/" style={styles.link}>Login di sini</Link>
                </p>
            </div>
        </div>
    );
};