import {GET, POST } from "../general/queries";

export default function SendEmailBtn({ lend, setMessage }) {
    function isLendingOlderThanOneMonth(lend) {
        return lend.returnDate == null && new Date(lend.lendDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    async function sendEmail(lend) {
        try {
            const subscriber = await GET(`http://localhost:3000/users/${lend.subscriberId}`)
            if (subscriber.length == 0 || subscriber == null)
                throw new Error('Subscriber not found')
            const emailAddress = subscriber[0].email
            const emailRequest = {
                recipient: emailAddress,
                subject: `Reminder: ${lend.bookName} Overdue Notice`,
                message: `Dear ${lend.subscriberName},\n\nThis is a reminder that the book "${lend.bookName}" has been borrowed for more than a month. Please return it at your earliest convenience.\n\nThank you!`,
            }
            await POST('http://localhost:3000/users/sendEmail', emailRequest)
            setMessage({txt:'The email was sent successfully', className:'success'})
        }
        catch (e) {
            setMessage({txt: e.message, className:'error'})
        }
    }

    return <>
        {isLendingOlderThanOneMonth(lend) &&
         <button type='button' onClick={() => sendEmail(lend)}>send email</button>}

    </>
}