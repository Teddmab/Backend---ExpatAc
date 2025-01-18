const templates = {
  passwordReset: (data) => `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${process.env.FRONTEND_URL}/reset-password?token=${data.resetToken}">
      Reset Password
    </a>
  `,
  
  deadlineReminder: (data) => `
    <h2>Upcoming Deadline Reminder</h2>
    <p>Your milestone "${data.milestone.title}" is due on ${data.milestone.deadline}.</p>
    <p>Current progress: ${data.milestone.progress}%</p>
  `
};

const getEmailTemplate = (type, data) => {
  const template = templates[type];
  return template ? template(data) : '';
};

module.exports = { getEmailTemplate };