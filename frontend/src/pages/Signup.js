import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
 // Assuming you want to use the CSS module from your friend
// If you are using your own 'Signup.css', just replace the import accordingly

const Signup = () => {
    const navigate = useNavigate();

    const signup = async () => {
        const inputs = document.querySelectorAll('input');
        const username = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const contactNo = inputs[3].value;
        const TC = inputs[4];  // Terms and conditions checkbox

        if (TC.checked) {
            try {
                const response = await fetch('https://event-management-website-api.vercel.app/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password, contactNo }),
                    credentials: 'include'
                });

                const data = await response.json();
                alert(Object.values(data));

                if (response.ok) {
                    navigate('/login');  // Redirect to login page after successful signup
                }

            } catch (err) {
                alert(err);
            }
        } else {
            alert('Please accept our T&C to proceed.');
        }
    };

    return (
        <div className={styles.signupmain}>
            <div className={styles.box}>
                <h1>Sign-up</h1>

                <div className={styles.bb}>
                    <input type="text" required placeholder="Name" />
                </div>

                <div className={styles.bb}>
                    <input type="email" required placeholder="Email" />
                </div>

                <div className={styles.bb}>
                    <input type="password" required placeholder="Password" />
                </div>

                <div className={styles.bb}>
                    <input type="tel" required placeholder="Contact Number" />
                </div>

                <div className={styles.checkbox}>
                    <label><input type="checkbox" required /> Terms and conditions agreement</label>
                </div>

                <div>
                    <button className={styles.btnn} onClick={signup}>Submit</button>
                </div>

            </div>
        </div>
    );
};

export default Signup;
