import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'emailDB'

const loggedInUser = {
    email: 'Dolevy@appsus.com',
    fullname: 'Dolev Levy'
}

_createMails()

export const mailService = {
    query,
    getUser,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getMailFromSearchParams
}



function query(filterBy = {}, sortBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {

            // Filtering
            mails = _filter(mails, filterBy)

            // Sorting
            mails = _sort(mails, sortBy)

            return mails
        })
}

function getUser() {
    return Promise.resolve(loggedInUser)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) return storageService.put(MAIL_KEY, mail)
    else return storageService.post(MAIL_KEY, mail)
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function getDefaultFilter() {
    return { txt: '', isRead: undefined, isStarred: undefined, status: undefined, labels: [] }
}

function getMailFromSearchParams(searchParams) {
    const defaultMail = getEmptyMail()
    const emptyMailParams = {}
    for (const field in defaultMail) {
        emptyMailParams[field] = searchParams.get(field) || ''
    }
    return emptyMailParams
}

// Private Functions

function _createMails() {
    let mails = localStorageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail(`e0`, 'YonatanHershko@gmail.com', 'About our project..', 'Our project is obviously the best. Even Yaron and Risan said it a few emails back, we are so darn good', undefined, true))
        mails.push(_createMail(`e1`, 'Egged Tours', 'אישור הזמנה', 'זהו אימייל לאישור פרטי ההזמנה שלך. נא לבדוק את המסמך המצורף לקבלת פרטים מדויקים בנוגע להזמנה שלך, כולל לוח שעות הגעה ואישור תשלום.', 1718715468, false))
        mails.push(_createMail(`e2`, 'GalShimer@gmail.com', "Dolev, help me out with this real quick", `Nevermind, I fixed it already`, 1718542668, false))
        mails.push(_createMail(`e3`, 'RisanBen@CodingAcademy.com', "Best project i've ever seen", 'I want to take a moment to express my admiration for your recent project. It stands out as one of the most impressive works I’ve encountered in my career. Your attention to detail, innovative approach, and dedication to excellence are truly commendable. Your project not only meets but exceeds expectations, showcasing your expertise and passion for your craft. I look forward to seeing how your future endeavors continue to push boundaries and inspire others. Keep up the outstanding work!', 1718024268, false))
        mails.push(_createMail(`e4`, 'YaronBiton@CodingAcademy.com', "Come be a metargel ♥", 'Join our team as a mentor and guide our aspiring talents to success. Your extensive experience and proven track record make you the ideal candidate to nurture and develop the next generation of professionals. Share your knowledge, insights, and passion for the industry with eager learners who are eager to learn from you. Together, we can make a meaningful impact on the community and empower individuals to achieve their full potential. Take this opportunity to shape the future of our industry and leave a lasting legacy of mentorship and leadership. Join us and be a part of something extraordinary!', 1716209868, false))
        mails.push(_createMail(`e5`, 'PukiPuka@gmail.com', "Come be my bestie, Dolev!", 'Hey Dolev, let’s catch up soon! Whether it’s grabbing a coffee or going for a hike, I’d love to spend some quality time together. It’s been too long since we’ve had a chance to chat and enjoy each other’s company. Let’s plan something fun and memorable – maybe even an adventure we’ve never tried before. I’m looking forward to hearing from you and making plans. Let’s make the most of our time and create new memories together!', 1710939468, false))
        mails.push(_createMail(`e6`, 'Mitnase@apple.com', "AD | I use apple, here's why it makes me better than you 🍎", 'Discover the transformative power of Apple products and how they can enhance your lifestyle. From cutting-edge technology to innovative features, Apple offers a seamless experience across all your devices. Whether you’re creating, communicating, or simply enjoying entertainment, Apple products deliver unmatched performance and reliability. Stay connected, productive, and inspired with a range of apps and services designed to elevate your everyday life. Join millions of users who rely on Apple for their daily needs and see why we’re more than just a brand – we’re a community of enthusiasts dedicated to innovation and excellence. Embrace the future of technology with Apple and unlock new possibilities today!', 1708433868, false))
        mails.push(_createMail(`e7`, 'DaRealNigerianPrince@gmail.ng', "Urgent Assistance Needed: Inheritance Transfer Proposal 🤑", 'Dear Sir/Madam, I am reaching out to you with a highly confidential matter that requires your urgent attention. I represent an estate seeking to transfer a substantial inheritance to your account. Your role in this transaction is crucial, and there will be a substantial reward for your cooperation. For detailed information and instructions on how to proceed, please respond to this email promptly. Your prompt response is appreciated as we move forward with this important matter. Thank you for your attention and cooperation.', 1706705868, false))
        mails.push(_createMail(`e8`, 'DolevyLevy@gmail.com', "Proposal: Nap pods for productivity enhancement 💤", 'Introducing nap pods as a strategic initiative to enhance workplace productivity and well-being. Research shows that short naps can significantly improve focus, creativity, and overall performance. By providing designated nap spaces, we aim to create a supportive environment where employees can recharge and return to work with renewed energy. This proposal outlines the benefits of nap pods, including increased morale, reduced stress levels, and enhanced job satisfaction. Let’s prioritize employee well-being and productivity by implementing this innovative solution. Together, we can foster a culture of balance and efficiency in the workplace. Join us in embracing this initiative and shaping a healthier work environment for everyone.', 1704113868, false))
        mails.push(_createMail(`e9`, 'MukiDeez@gmail.com', "Office Olympics planning committee meeting 🏅", 'Calling all enthusiasts! Join us for a planning committee meeting to organize the upcoming Office Olympics. Your creative ideas and enthusiastic participation are essential to making this event a success. Together, we’ll brainstorm activities, set objectives, and ensure everything runs smoothly. Let’s create an unforgettable experience that celebrates teamwork, camaraderie, and friendly competition. Whether you’re a seasoned athlete or a first-time participant, there’s a role for everyone to play. Let’s rally together and make this Office Olympics the best one yet!', 1700225868, false))
        mails.push(_createMail(`e10`, 'Netflix', "Urgent: Your Netflix queue is feeling neglected.", 'Don’t let your Netflix queue gather dust – it’s time to indulge in some binge-watching! Dive into a world of captivating shows and movies waiting to be discovered. Whether you’re into thrilling dramas, laugh-out-loud comedies, or gripping documentaries, there’s something for every mood and taste. Rediscover the joy of streaming with our curated selection of must-watch titles. Grab your popcorn, cozy up on the couch, and immerse yourself in entertainment that’s just a click away. Treat yourself to a well-deserved break and unwind with your favorite characters and stories. Your Netflix queue awaits – let the binge-watching begin!', 1692277068, false))
        mails.push(_createMail(`e11`, 'Your mind', "Reminder: Your existential crisis is overdue for resolution.", 'Take a moment to reflect on life’s bigger questions and explore paths to personal growth and fulfillment. Addressing your existential concerns can lead to greater clarity and a deeper sense of purpose. Whether you’re questioning your career path, relationships, or life goals, now is the time to seek answers and find direction. Embrace introspection as a valuable tool for self-discovery and growth. Engage in meaningful conversations, seek guidance from mentors, or simply spend time in introspection. Your journey to resolution begins with acknowledging your questions and taking steps towards understanding. Embrace the opportunity to explore and evolve, knowing that each step forward brings you closer to clarity and peace of mind.', 1681736268, false))
        mails.push(_createMail(`e12`, 'PukiPuka@gmail.com', "⚠️ Emergency: The office printer is possessed and printing cat memes.", 'Attention all team members, we are facing an urgent situation with the office printer. Instead of printing important documents, it has taken on a mischievous behavior of printing cat memes uncontrollably. This unexpected turn of events is causing disruptions and delays in our daily operations. Immediate action is required to rectify this amusing yet disruptive issue. IT support has been notified, and they are working diligently to resolve the matter. In the meantime, please refrain from sending print jobs to avoid further complications. We appreciate your understanding and cooperation as we address this unexpected situation and restore normal functionality to the printer.', 1676465868, false))
        mails.push(_createMail(`e13`, 'DukeBoxer@gmail.com', "📢 Proposal: Instituting 'Reply All' awareness training ASAP.", `In light of recent incidents, we propose implementing 'Reply All' awareness training to enhance communication etiquette across the organization. The objective is to promote thoughtful and efficient use of email communication, reducing unnecessary messages and improving productivity. Training sessions will cover best practices, scenarios, and practical tips for using 'Reply All' responsibly. By raising awareness and fostering a culture of mindful communication, we aim to streamline workflow and enhance overall efficiency. Your participation and support are crucial to the success of this initiative. Together, we can create a more effective and respectful email environment that benefits everyone.`, 1673960268, false))
        mails.push(_createMail(`e14`, 'JohnSmith@gmail.com', "🔔 Reminder: Avoiding work won't make it disappear, but it might make you happier.", 'As a friendly reminder, procrastination rarely solves problems, but it can sometimes offer a brief respite from the demands of work. While it’s tempting to put off tasks, addressing them promptly often leads to greater satisfaction and peace of mind. Remember that productivity is not just about completing tasks; it’s also about maintaining a healthy work-life balance and feeling accomplished. Take breaks when needed, but also stay focused on achieving your goals. By finding a balance between work and relaxation, you can navigate challenges effectively and enjoy a sense of fulfillment in your professional endeavors.', 1671800268, false))
        mails.push(_createMail(`e15`, 'EmilyJones@gmail.com', "☕ Your coffee break is a brief escape from the monotony of existence.", 'Savor your coffee break as a momentary escape from the routine and responsibilities of daily life. Whether you prefer a strong espresso or a comforting latte, let each sip rejuvenate your spirits and recharge your energy. Use this time to unwind, reflect, or simply enjoy the company of colleagues. Embrace the ritual of coffee breaks as a small but meaningful pause in your day. As you take this moment for yourself, consider it an opportunity to refresh your perspective and approach tasks with renewed vigor. Let the aroma and warmth of your favorite brew remind you to appreciate life’s simple pleasures amidst the hustle and bustle of the workday.', 1671541068, false))
        mails.push(_createMail(`e16`, 'SarahBrown@gmail.com', "💻 Technology Update: Embracing the cloud; hope it doesn't rain data.", 'Our organization is transitioning to cloud-based technologies to enhance efficiency, scalability, and collaboration. Embracing the cloud allows us to streamline operations, reduce costs, and adapt quickly to changing business needs. By leveraging cloud solutions, we aim to optimize resource allocation and improve service delivery across all departments. This technology update marks a significant step towards modernizing our infrastructure and supporting future growth. We are committed to ensuring data security and privacy while harnessing the power of cloud computing to drive innovation and competitiveness. Stay tuned for further updates as we continue our journey towards digital transformation and excellence in service.', 1669899468, false))
        mails.push(_createMail(`e17`, 'MarkTaylor@gmail.com', "IT Helpdesk: Ghost in the machine or just another Windows update?", 'Our IT Helpdesk team is currently investigating reported issues with software performance following a recent system update. Users have experienced unexpected glitches and slowdowns, prompting concerns about system stability. Rest assured, our technical experts are working diligently to diagnose and resolve these issues promptly. In the meantime, we appreciate your patience and understanding as we work to restore normal functionality. If you encounter any specific issues or have additional information to share, please contact the IT Helpdesk for assistance. Your feedback is invaluable as we strive to maintain a seamless user experience and minimize disruptions. We apologize for any inconvenience caused and thank you for your cooperation during this troubleshooting process.', 1669381068, false))
        mails.push(_createMail(`e18`, 'LauraMiller@gmail.com', "Budget Review: More cuts than a horror movie; bring popcorn.", 'Our annual budget review has identified areas for cost reduction and efficiency improvements across departments. This comprehensive analysis reveals opportunities to optimize spending without compromising quality or service delivery. As we navigate through budget adjustments, transparency and accountability remain our guiding principles. Each decision is carefully evaluated to align with organizational goals and financial sustainability. We invite your insights and collaboration as we prioritize investments and allocate resources effectively. Together, we can achieve greater financial resilience and position our organization for long-term success. Join us in this critical review process as we seek to streamline operations and maximize value for stakeholders.', 1668949068, false))
        mails.push(_createMail(`e19`, 'MichaelClark@gmail.com', "Customer Support Request: Urgent Ticket Update Needed", 'Your recent customer support ticket requires urgent attention to ensure timely resolution. Our team is committed to providing exceptional service and addressing your concerns promptly. We apologize for any inconvenience caused and appreciate your patience as we work towards a satisfactory resolution. Please review the latest updates and provide any additional information or feedback to assist us in resolving this matter efficiently. Your satisfaction is our priority, and we remain dedicated to exceeding your expectations. Thank you for choosing our services and trusting us with your support needs. We look forward to resolving this issue to your satisfaction and restoring your confidence in our commitment to excellence.', 1668517068, false))
        mails.push(_createMail(`e20`, 'JessicaWilson@gmail.com', "Health and Safety Notice: Flu Season Precautionary Measures", 'As flu season approaches, we are implementing precautionary measures to protect the health and well-being of our employees and visitors. These measures include promoting vaccination, practicing good hygiene, and maintaining a clean and sanitized work environment. By taking proactive steps, we aim to minimize the spread of illness and ensure a safe workplace for everyone. Your cooperation in adhering to these guidelines is crucial to maintaining a healthy environment. Together, we can reduce the impact of flu season and support each other’s well-being. Stay informed about flu prevention tips and updates as we prioritize health and safety throughout our organization. Thank you for your attention to this important matter and commitment to a healthier workplace.', 1668085068, false))
        mails.push(_createMail(`e21`, 'RobertBrown@gmail.com', 'Regarding Project Update', 'I’m writing to provide you with an update on the progress of our ongoing project. We have made significant strides in meeting key milestones and addressing challenges along the way. Our team remains committed to delivering results that exceed expectations and drive positive outcomes for our stakeholders. This update outlines recent achievements, upcoming milestones, and action items to keep the project on track. Your continued support and collaboration are essential to our success. Together, we can achieve our goals and make a meaningful impact. Please review the attached document for detailed information and feel free to reach out with any questions or feedback. Thank you for your dedication and contributions to this project.', 1667912268, false))
        mails.push(_createMail(`e22`, 'SophiaLee@gmail.com', 'Meeting Agenda for Next Week', 'Here’s the agenda for our upcoming meeting scheduled for next week. We will cover key topics including project updates, strategic initiatives, and action items. Your participation and input are crucial to ensuring productive discussions and effective decision-making. Please review the agenda and prepare any necessary materials or insights to contribute to our meeting’s success. Together, we can address challenges, seize opportunities, and advance our objectives. If you have any additional topics you’d like to discuss, please let me know in advance. Thank you for your commitment to our team’s success and collaboration in achieving our goals.', 1667221068, false))
        mails.push(_createMail(`e23`, 'AndrewWhite@gmail.com', 'Action Required: Task Assignment', 'You have been assigned a new task that requires your immediate attention. This assignment is part of our ongoing efforts to achieve project milestones and deliverables. Please review the task details, timeline, and expectations outlined in the attached document. Your prompt action and diligent effort are essential to meeting project deadlines and ensuring successful outcomes. If you have any questions or need clarification, don’t hesitate to reach out. Together, we can drive progress and make significant contributions to our team’s objectives. Thank you for your commitment and dedication to excellence in all your endeavors.', 1666961868, false))
        mails.push(_createMail(`e24`, 'OliviaMoore@gmail.com', 'Feedback Request: Recent Presentation', 'I value your feedback on the recent presentation I delivered. Your insights and suggestions are important to me as I strive to improve my communication skills and presentation style. Please take a moment to share your thoughts on the content, delivery, and overall effectiveness of the presentation. Your constructive criticism will help me refine future presentations and better serve our audience. Your feedback is anonymous and will be used solely for professional development purposes. Thank you for taking the time to provide valuable input and contribute to my growth as a presenter. I look forward to hearing from you and incorporating your feedback into my future endeavors.', 1666616268, false))
        mails.push(_createMail(`e25`, 'DanielYoung@gmail.com', 'Reminder: Deadline Approaching', 'Just a friendly reminder that the deadline for [specific task/project] is approaching. Please ensure all necessary tasks are completed and submitted on time to avoid any delays or complications. Your prompt attention to this matter is greatly appreciated as we strive to meet project milestones and deliverables. If you require any assistance or additional resources to meet the deadline, please reach out to the relevant team members or stakeholders. Together, we can ensure a successful outcome and maintain our commitment to excellence. Thank you for your diligence and dedication to achieving our shared goals.', 1664369868, false))
        mails.push(_createMail(`e26`, 'IsabellaDavis@gmail.com', 'Follow-up on Project Discussion', 'Following our recent project discussion, I wanted to touch base and recap our key takeaways and action items. We had productive discussions on [specific topics/issues], and it’s essential to maintain momentum as we move forward. Please review the attached summary for detailed notes and action steps. Your continued engagement and contributions are instrumental to our project’s success. Let’s stay aligned on goals, address challenges proactively, and drive progress together. If you have any further insights or updates to share, please feel free to reach out. Thank you for your commitment to excellence and collaboration in achieving our objectives.', 1663246668, false))
        mails.push(_createMail(`e27`, 'EthanWilson@gmail.com', 'Upcoming Team Event Details', 'Exciting news! Here are the details for our upcoming team event. We have planned a fun-filled gathering to celebrate our achievements and foster team spirit. Join us for [event details, activities, and agenda]. Your participation is vital to making this event a success and strengthening our team bonds. Please RSVP by [deadline] to confirm your attendance and indicate any dietary preferences or special accommodations. Let’s come together to enjoy a memorable event and create lasting memories with our colleagues. Your enthusiasm and participation contribute to the positive culture and camaraderie within our team. We look forward to seeing you there and celebrating our collective successes.', 1661950668, false))
        mails.push(_createMail(`e28`, 'AvaAnderson@gmail.com', 'Policy Update: Work From Home Guidelines', 'We are updating our Work From Home (WFH) guidelines to provide clarity and support for remote work arrangements. These updated policies aim to enhance flexibility, maintain productivity, and promote work-life balance for our employees. Key updates include guidelines for communication, performance expectations, and IT security protocols. By outlining clear expectations and best practices, we aim to ensure consistency and effectiveness in remote work operations. Your adherence to these guidelines is essential to maintaining operational continuity and safeguarding our corporate resources. Please review the updated policy document and reach out to HR or IT support for any questions or clarifications. Thank you for your cooperation in supporting our remote work initiatives and contributing to a productive work environment.', 1661432268, false))
        mails.push(_createMail(`e29`, 'JamesJohnson@gmail.com', 'Request for Budget Approval', 'I am submitting a request for budget approval for [specific project/initiative]. This proposal outlines the scope, objectives, and financial considerations associated with the project. We have conducted a thorough cost-benefit analysis and identified funding requirements to support project implementation. Your review and approval of this budget proposal are crucial to advancing our strategic goals and delivering value to our stakeholders. Please review the attached document for detailed information and consider the anticipated benefits and returns on investment. Your prompt attention to this matter is appreciated as we strive to allocate resources efficiently and achieve our organizational objectives. Thank you for your support and commitment to driving financial stewardship and operational excellence.', 1661259468, false))
        mails.push(_createMail(`e30`, 'MiaMartinez@gmail.com', 'Training Session Registration', 'We are pleased to invite you to register for an upcoming training session designed to enhance [specific skills or knowledge area]. This session will provide valuable insights, practical tools, and hands-on learning opportunities to support your professional development. Whether you’re looking to expand your expertise, refine your skills, or explore new techniques, this training is tailored to meet your needs. Join us in a collaborative learning environment where you can exchange ideas, learn from industry experts, and gain actionable strategies to excel in your role. Please review the agenda and session details included in the attached document. Secure your spot today by completing the registration process and confirming your participation. We look forward to your attendance and mutual growth through this enriching learning experience.', 1661000268, false))

        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(id, from = 'momo@momo.com',
    subject = utilService.makeLorem(utilService.getRandomIntInclusive(1, 4)),
    body = utilService.makeLorem(utilService.getRandomIntInclusive(5, 20)),
    sentAt = Math.floor(Date.now() / 1000),
    isRead = false) {
    return {
        id,
        subject,
        body,
        isRead,
        isStarred: false,
        sentAt,
        removedAt: null,
        from,
        to: loggedInUser.email
    }
}

function _filter(mails, filterBy) {
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regex.test(mail.body) || regex.test(mail.subject) || regex.test(mail.from))
    }
    if (filterBy.isRead !== undefined) {
        mails = mails.filter(mail => mail.isRead === filterBy.isRead)
    }
    if (filterBy.status === 'inbox') {
        mails = mails.filter(mail => mail.to === loggedInUser.email && !mail.removedAt && mail.sentAt)
    }
    if (filterBy.status === 'sent') {
        mails = mails.filter(mail => mail.from === loggedInUser.email && mail.sentAt)
    }
    if (filterBy.status === 'starred') {
        mails = mails.filter(mail => mail.isStarred)
    }
    if (filterBy.status === 'drafts') {
        mails = mails.filter(mail => !mail.sentAt)
    }
    if (filterBy.status === 'trash') {
        mails = mails.filter(mail => mail.removedAt)
    }
    return mails
}

function _sort(mails, sortBy) {
    if (sortBy.subject) {
        mails = mails.toSorted((m1, m2) => m1.subject.localeCompare(m2.subject) * sortBy.subject)
    }
    if (sortBy.date) {
        mails = mails.toSorted((m1, m2) => (m2.sentAt - m1.sentAt) * sortBy.date)
    }
    return mails
}