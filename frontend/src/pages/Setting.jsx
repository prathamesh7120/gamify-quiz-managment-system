import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "Male",
    profilePhoto: null,

    oldPassword: "",
    newPassword: "",
    confirmPassword: "",

    muteAll: false,
    emailNotif: true,
    quizNotif: true,
    leaderboardNotif: true,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const inputStyle =
    "w-full p-2.5 bg-[#1E293B] rounded-lg text-white placeholder:text-gray-400 border border-transparent focus:border-[#6C5CE7] outline-none";

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (activeTab === "password") {
      if (!form.oldPassword) {
        newErrors.oldPassword = "Old password required";
      }

      if (form.newPassword.length < 6) {
        newErrors.newPassword = "Min 6 characters required";
      }

      if (form.newPassword !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("✅ Settings saved successfully!");
    }
  };

  const tabs = ["profile", "password", "notifications"];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">⚙️ Admin Settings</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63]"
                : "bg-[#1E293B] hover:bg-[#273449]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PROFILE */}
      {activeTab === "profile" && (
        <Card className="p-6 bg-[#111827] space-y-4 rounded-2xl">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputStyle}
            >
              <option className="text-black">Male</option>
              <option className="text-black">Female</option>
              <option className="text-black">Other</option>
            </select>
          </div>
        </Card>
      )}

      {/* PASSWORD */}
      {activeTab === "password" && (
        <Card className="p-6 bg-[#111827] space-y-4 rounded-2xl">
          <div>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={form.oldPassword}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.oldPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.oldPassword}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.newPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <Card className="p-6 bg-[#111827] space-y-4 rounded-2xl text-white">
          {[
            { label: "Mute / Unmute All", name: "muteAll" },
            { label: "Email Notifications", name: "emailNotif" },
            { label: "Quiz Notifications", name: "quizNotif" },
            { label: "Leaderboard Notifications", name: "leaderboardNotif" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center bg-[#1E293B] p-3 rounded-lg"
            >
              <span>{item.label}</span>

              {/* TOGGLE SWITCH */}
              <button
                onClick={() =>
                  handleChange({
                    target: {
                      name: item.name,
                      type: "checkbox",
                      checked: !form[item.name],
                    },
                  })
                }
                disabled={form.muteAll && item.name !== "muteAll"}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                  form[item.name]
                    ? "bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63]"
                    : "bg-gray-500"
                } ${
                  form.muteAll && item.name !== "muteAll"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                    form[item.name]
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </Card>
      )}

      {/* SAVE */}
      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63]"
        >
          Save Changes
        </Button>
      </div>

      {success && (
        <p className="mt-4 text-green-400">{success}</p>
      )}
    </div>
  );
}