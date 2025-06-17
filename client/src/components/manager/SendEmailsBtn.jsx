import { GET, POST } from "../general/queries";

export default function SendEmailBtn({ lends, setMessage }) {
    function isLendingOlderThanOneMonth(lend) {
        return lend.returnDate == null && new Date(lend.lendDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    async function sendEmail(lend) {
        const results = [];
        try {
            const subscriber = await GET(`http://localhost:3000/users/${lend.subscriberId}`);
            if (subscriber.length === 0 || subscriber == null) {
                results.push(`Failed to send email to: Subscriber not found for subscriber ID ${lend.subscriberId}`);
                return results;
            }
            const emailAddress = subscriber[0].email;
            const emailRequest = {
                recipient: emailAddress,
                subject: `Reminder: ${lend.bookName} Overdue Notice`,
                message: `Dear ${lend.subscriberName},\n\nThis is a reminder that the book "${lend.bookName}" has been borrowed for more than a month.
                 Please return it at your earliest convenience.\n\nThank you!`,
            };
            await POST('http://localhost:3000/users/sendEmail', emailRequest);
            results.push(`Successfully sent email to: ${emailAddress}`);
        } catch (e) {
            results.push(`Failed to send email: ${e.message}`);
        }
        return results;
    }

    async function handleSendEmails() {
        const messages = [];
        for (const lend of lends.all) {
            if (isLendingOlderThanOneMonth(lend)) {
                const result = await sendEmail(lend);
                messages.push(...result);
            }
        }
        if (messages.length > 0) {
            setMessage({ txt: messages.join('\n'), className: messages.some(msg => msg.startsWith('Failed')) ? 'error' : 'success' });
        } else {
            setMessage({ txt: 'No overdue lends to notify.', className: 'success' });
        }
    }

    return (
        <>
            <button type='button' onClick={handleSendEmails}>Send Emails</button>
        </>
    );
}