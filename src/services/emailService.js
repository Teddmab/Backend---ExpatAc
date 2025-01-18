const transporter = require('../config/email');
const { getEmailTemplate } = require('../utils/emailTemplates');

class EmailService {
  static async sendPasswordReset(email, resetToken) {
    const template = getEmailTemplate('passwordReset', { resetToken });
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: template
    });
  }

  static async sendDeadlineReminder(email, milestone) {
    const template = getEmailTemplate('deadlineReminder', { milestone });
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Upcoming Deadline Reminder',
      html: template
    });
  }
}

module.exports = EmailService;