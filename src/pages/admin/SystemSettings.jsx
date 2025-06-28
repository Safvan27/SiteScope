import React, { useState } from 'react';
import DashboardHeader from '../../components/common/DashboardHeader';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Construction Tracker',
    emailNotifications: true,
    autoReports: true,
    backupFrequency: 'daily',
    maintenanceMode: false
  });

  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  return (
    <div className="admin-dashboard">
      <DashboardHeader title="System Settings" />
      <div className="dashboard-content">

      <div className="system-settings">
        <h1>System Settings</h1>

        <div className="settings-sections">
          <div className="settings-section">
            <h2>General Settings</h2>
            <div className="setting-item">
              <label>Site Name</label>
              <input 
                type="text" 
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Notifications</h2>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                Email Notifications
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={settings.autoReports}
                  onChange={(e) => handleSettingChange('autoReports', e.target.checked)}
                />
                Automatic Reports
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>System</h2>
            <div className="setting-item">
              <label>Backup Frequency</label>
              <select 
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                />
                Maintenance Mode
              </label>
            </div>
          </div>

          <div className="settings-actions">
            <button className="btn-primary">Save Settings</button>
            <button className="btn-secondary">Reset to Defaults</button>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;