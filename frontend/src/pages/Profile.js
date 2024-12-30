import React from 'react'
import './Profile.css'
const Profile = () => {
  return (
    <div className="profile-main">
      <div class="profile-container">
        <div class="profile-header">
            <img src="profile.jpg" alt="Profile Picture" class="profile-picture"/>
            <div class="profile-info">
                <h1>John Doe</h1>
                <p>Email: <a href="mailto:john.doe@example.com">john.doe@example.com</a></p>
                <p>Contact: +1 234 567 890</p>
            </div>
        </div>

        <div class="card financial-overview">
            <h2>Financial Overview</h2>
            <ul>
                <li><strong>Total Savings:</strong> $10,000</li>
                <li><strong>Total Expenses:</strong> $2,500</li>
                <li><strong>Investments:</strong> $5,000</li>
            </ul>
        </div>

        <div class="card transaction-history">
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2024-01-01</td>
                        <td>Grocery Shopping</td>
                        <td>Expenses</td>
                        <td>$200</td>
                    </tr>
                    <tr>
                        <td>2024-01-05</td>
                        <td>Salary</td>
                        <td>Income</td>
                        <td>$2,000</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card security-settings">
            <h2>Security Settings</h2>
            <p><a href="#" class="link">Change Password</a> | <a href="#" class="link">Enable Two-Factor Authentication</a></p>
        </div>
    </div>
    </div>
  )
}

export default Profile