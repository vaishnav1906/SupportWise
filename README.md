# 💬 SupportWise

**Smart support that understands you.**  
SupportWise is an intelligent support assistant that delivers instant answers through AI-powered FAQ matching, enables seamless ticket creation, and provides an admin dashboard to manage user queries.


## 🚀 Features

### 🧠 AI-Powered FAQ Assistant
- Understands context and intent using intelligent matching.
- Provides immediate, relevant answers from a predefined FAQ dataset.
- Optionally escalates to human support if no match is found.

### 🎟️ Ticketing System
- When no solution is found, users can:
  - Submit a support ticket via a form (name, email, phone, and issue).
  - Automatically generate and send tickets to the admin dashboard.
  - Receive an email with the full chat transcript for follow-up.

### 📬 Email Integration
- Sends chat transcripts to support team email (`support.wise@gmail.com`) for better tracking and context.

### 📊 Admin Dashboard
- View total, pending, and resolved tickets.
- Monitor support activity in real-time.
- Reset all tickets and manage escalation flow easily.

### 🧑‍💻 Admin Login
- Secure access to the admin dashboard.
- Authentication with username/password.

### 🌙 Dark Mode Friendly
- Consistent dark UI across the app for an elegant user experience.

---

## 🏗️ Project Structure

```
📁 public/
📁 src/
 ┣ 📂components/
 ┃ ┗ 📂ui/              → Chat UI, Forms, Providers
 ┣ 📂hooks/             → Custom hooks (`use-mobile`, `use-toast`)
 ┣ 📂lib/               → Utility functions
 ┣ 📂pages/             → Routing pages (Landing, Login, Dashboard, etc.)
 ┣ 📂types/             → TypeScript types
 ┣ App.tsx             → Root app component
 ┣ main.tsx            → App entry point
```

---

## 🛠️ Built With

- **React + TypeScript**
- **TailwindCSS** – for utility-first styling
- **Vite** – lightning-fast dev environment
- **Email Integration** – through `mailto:` or external client trigger
- **Local Storage / State Management** – (assumed if form/chat persist)

---

## 📦 Installation

```bash
git clone https://github.com/vaishnav1906/SupportWise.git
cd SupportWise
npm install
npm run dev
```

> Visit `http://localhost:8080` to get started.


---

## 🙌 Contributing

Contributions are welcome! Please fork the repo and open a pull request.

---

## 🌐 Demo 

https://support-wise.vercel.app/

Username - John123

Password - John321

---

## 📧 Contact

Have questions or want to collaborate?

📩 Email: suppport.wise@gmail.com

---

## 📄 License

MIT License © 2025 SupportWise
