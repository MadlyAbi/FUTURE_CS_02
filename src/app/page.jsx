"use client";
import React, { useState } from "react";

function MainComponent() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ score: 0, label: "", color: "" });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState([]);

  const analyzePassword = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    const commonPatterns = [
      /password/i,
      /qwerty/i,
      /123456/,
      /abc123/i,
      /admin/i,
    ];
    if (commonPatterns.some((pattern) => pattern.test(pass))) {
      score = Math.max(0, score - 2);
    }

    const strengthLevels = [
      { score: 0, label: "Very Weak", color: "bg-red-500" },
      { score: 2, label: "Weak", color: "bg-orange-500" },
      { score: 3, label: "Medium", color: "bg-yellow-500" },
      { score: 4, label: "Strong", color: "bg-blue-500" },
      { score: 6, label: "Very Strong", color: "bg-green-500" },
    ];

    const result = strengthLevels.reduce((acc, level) =>
      score >= level.score ? level : acc
    );

    setStrength({ ...result, width: `${(score / 6) * 100}%` });
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const length = 16;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(result);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    analyzePassword(newPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transition-colors duration-300">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-roboto">
            Password Analyzer
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <i
              className={`fa ${
                darkMode ? "fa-sun" : "fa-moon"
              } text-gray-600 dark:text-gray-300`}
            ></i>
          </button>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              placeholder="Enter your password"
              name="password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out transform ${strength.color}`}
              style={{ width: strength.width }}
            ></div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Strength: {strength.label}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Copy:
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <i className="fa fa-copy text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            <i className="fa fa-magic mr-2"></i>
            Generate Strong Password
          </button>
          {generatedPassword && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg break-all relative group">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                {generatedPassword}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(generatedPassword)}
                className="absolute right-2 top-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
              >
                <i className="fa fa-copy text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="mb-2 font-medium">Password Requirements:</p>
          <ul className="space-y-1.5">
            <li className="flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              At least 8 characters
            </li>
            <li className="flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              Uppercase letters (A-Z)
            </li>
            <li className="flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              Lowercase letters (a-z)
            </li>
            <li className="flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              Numbers (0-9)
            </li>
            <li className="flex items-center">
              <i className="fa fa-check-circle text-green-500 mr-2"></i>
              Special characters (!@#$%^&*)
            </li>
          </ul>
          {passwordHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t dark:border-gray-600">
              <p className="font-medium mb-2">Recent Passwords:</p>
              <div className="space-y-1">
                {passwordHistory.slice(-3).map((item, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;