// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../api';

export const Dashboard = () => {
    const { user, logout, login } = useAuth(); 
    const navigate = useNavigate();

    const [usersList, setUsersList] = useState<any[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    const [editName, setEditName] = useState(user?.name || '');
    const [editAge, setEditAge] = useState<number | string>(user?.age || '');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (user?.role === 'super admin') {
            fetchUsers();
        }
    }, [user]);

    const fetchUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const response: any = await userAPI.getAllUsers();
            setUsersList(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data users", error);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setIsUpdating(true);
        try {
            const updateData = { name: editName, age: Number(editAge) };
            await userAPI.updateProfile(user.id, updateData);
            
            login({ ...user, ...updateData });
            alert("Profil berhasil diperbarui!");
        } catch (error) {
            alert("Gagal memperbarui profil.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!user) {
        return <p>Akses ditolak.</p>;
    }

    const isAdmin = user.role === 'super admin';

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'system-ui' }}>
            <div style={{ maxWidth: isAdmin ? '900px' : '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', transition: 'max-width 0.3s ease' }}>
                
                {/* HEADER PROFILE */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ margin: 0, color: '#0f172a' }}>Halo, {user.name}!</h1>
                        <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{user.email}</p>
                    </div>
                    <span style={{ 
                        backgroundColor: isAdmin ? '#fef2f2' : '#eff6ff', 
                        color: isAdmin ? '#ef4444' : '#3b82f6', 
                        padding: '8px 16px', borderRadius: '999px', fontWeight: 'bold', fontSize: '14px', border: `1px solid ${isAdmin ? '#fca5a5' : '#bfdbfe'}`
                    }}>
                        {user.role.toUpperCase()}
                    </span>
                </div>

                {/* AREA SUPER ADMIN */}
                {isAdmin && (
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#0f172a', marginTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>👥 Manajemen Pengguna</span>
                            <button onClick={fetchUsers} style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer' }}>
                                🔄 Refresh
                            </button>
                        </h3>
                        
                        {isLoadingUsers ? (
                            <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Memuat data pengguna...</p>
                        ) : (
                            <div style={{ overflowX: 'auto', marginTop: '15px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                                            <th style={{ padding: '12px' }}>Nama</th>
                                            <th style={{ padding: '12px' }}>Email</th>
                                            <th style={{ padding: '12px' }}>Umur</th>
                                            <th style={{ padding: '12px' }}>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.map((u, index) => (
                                            <tr key={u.id || index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '12px', fontWeight: '500', color: '#334155' }}>{u.name}</td>
                                                <td style={{ padding: '12px', color: '#64748b' }}>{u.email}</td>
                                                <td style={{ padding: '12px', color: '#64748b' }}>{u.age || '-'}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: u.role === 'super admin' ? '#fef2f2' : '#f1f5f9', color: u.role === 'super admin' ? '#ef4444' : '#475569', fontWeight: 'bold' }}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* AREA USER BIASA */}
                {!isAdmin && (
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#0f172a', marginTop: 0 }}>⚙️ Pengaturan Profil</h3>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Perbarui informasi data diri lu di bawah ini.</p>
                        
                        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    value={editName} 
                                    onChange={(e) => setEditName(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>Umur</label>
                                <input 
                                    type="number" 
                                    value={editAge} 
                                    onChange={(e) => setEditAge(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                                    placeholder="Opsional"
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={isUpdating}
                                style={{ marginTop: '10px', padding: '12px', borderRadius: '6px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: isUpdating ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                                {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>
                )}

                {/* TOMBOL LOGOUT GLOBAL */}
                <button 
                    onClick={() => { logout(); navigate('/'); }} 
                    style={{ marginTop: '30px', padding: '12px 20px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer', fontWeight: 'bold', width: '100%', transition: 'background 0.2s' }}>
                    Logout dari Sistem
                </button>
            </div>
        </div>
    );
};