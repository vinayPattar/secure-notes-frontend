import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const UserProfile = () => {
    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1); // Step 1: Enable, Step 2: Verify

    useEffect(() => {
        const fetch2FAStatus = async () => {
            try {
                const response = await api.get(`/auth/user/2fa-status`);
                setIs2faEnabled(response.data.is2faEnabled);
            } catch (error) {
                console.error('Error fetching 2FA status', error);
            }
        };
        fetch2FAStatus();
    }, []);

    const enable2FA = async () => {
        try {
            const response = await api.post(`/auth/enable-2fa`);
            setQrCodeUrl(response.data);
            setStep(2);
        } catch (error) {
            console.error('Error enabling 2FA', error);
        }
    };

    const disable2FA = async () => {
        try {
            await api.post(`/auth/disable-2fa`);
            setIs2faEnabled(false);
            setQrCodeUrl('');
        } catch (error) {
            console.error('Error disabling 2FA', error);
        }
    };

    const verify2FA = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('code', code);

            await api.post(`/auth/verify-2fa`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            alert('2FA verified successfully');
            setIs2faEnabled(true);
            setStep(1);
        } catch (error) {
            console.error('Error verifying 2FA', error);
            alert('Invalid 2FA code');
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {step === 1 && (
                <button onClick={is2faEnabled ? disable2FA : enable2FA}>
                    {is2faEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
            )}
            {step === 2 && (
                <div>
                    <img src={qrCodeUrl} alt="QR Code" />
                    <input
                        type="text"
                        placeholder="Enter 2FA code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={verify2FA}>Verify 2FA</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
