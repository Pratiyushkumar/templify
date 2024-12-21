# Templify ✨
## 🔄 Table of Contents

- [Templify ✨](#templify-)
  - [🔄 Table of Contents](#-table-of-contents)
  - [🕵️‍♂️ Problem Statement](#️️-problem-statement)
  - [Motivation](#motivation)
  - [🚀 Our Solution](#-our-solution)
  - [🔗 Live URL](#-live-url)
  - [📊 Features](#-features)
  - [🔧 Technologies Used](#-technologies-used)
  - [🌍 Future Scope](#-future-scope)
  - [📃 Setup Guide](#-setup-guide)
  - [🛠️ Contributing](#️-contributing)

---

**A Platform to Automate and Simplify Template Creation**

Templify revolutionizes the way templates are created. By allowing users to upload tabular data files and dynamically reference fields, it eliminates the time-consuming and error-prone process of manual document creation. This solution is perfect for anyone who needs to generate personalized PDFs or text files from tabular data efficiently and accurately.

---

## 🕵️‍♂️ Problem Statement

Creating personalized PDFs manually is a tedious and time-consuming process. Users often have to:
- Manually input user details one by one into templates.
- Spend hours adjusting templates for individual documents.

This repetitive process not only hampers productivity but also introduces a high likelihood of errors, especially when working with large datasets.

## Motivation
This idea came from a recent problem that we faced when we had to distribute swags to our fellow contributors  and we had to manually enter the details for each and every members from an excel file.

## 🚀 Our Solution

**Templify** provides a seamless way to automate this process. It allows users to:
- Upload a file containing tabular user data.
- Dynamically reference data fields using placeholders like `@user_name`.
- Define their own template like `
  Hi @user_name, this gift will be sent to you at @address 
  `
- Generate a preview of the final document within seconds.
- Download the output in either PDF or text format for easy use.

With Templify, users can create professional documents effortlessly, saving time and reducing the risk of errors.


---

## 🔗 Live URL

Experience the power of Templify firsthand by visiting the live application here: [Templify on Vercel](https://templify-theta.vercel.app)

---

## 📊 Features

1. **User Authentication** 
   - Secure login and signup using Appwrite.
2. **File Upload and Template Creation**
   - Upload data files.
   - Use placeholders to dynamically create templates.
3. **Download Options**
   - Export files in PDF or text format.
4. **Responsive Design**
   - Seamlessly works across all devices.
5. **Interactive UI**
   - Intuitive and user-friendly interface built with modern design principles.

---

## 🔧 Technologies Used

- **React**: Frontend library for building the UI.
- **Tailwind CSS**: For styling and responsiveness.
- **Appwrite**: Backend for user authentication and database management.
- **Aceternity & Shadcn**: Additional tools for enhanced functionality and design consistency.

---

## 🌍 Future Scope

1. **Multi-File Upload**
   - Allow users to upload multiple files and combine outputs.
2. **Template History**
   - Save and reuse previous templates for quick recreation.
3. **Designer Templates**
   - User can choose between pre-built designer templates for PDFs
4. **Share via email**
   - User can share the PDFs via email directly from app.

---

## 📃 Setup Guide

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Pratiyushkumar/templify/
   cd templify
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```env
   VITE_PROJECT_ID=<your_appwrite_endpoint>
   VITE_API_ENDPOINT=<your_appwrite_project_id>
   ```

4. **Start the Development Server**
   ```bash
   pnpm dev
   ```

5. **Build for Production**
   ```bash
   pnpm run build
   ```

---

## 🛠️ Contributing

We welcome contributions to improve Templify! Follow these steps to contribute:
- Fork the repository.
- Create a new branch: `git checkout -b feature-name`.
- Commit changes: `git commit -m 'Add feature-name'`.
- Push to the branch: `git push origin feature-name`.
- Submit a pull request.

---

🔍 **Start Automating Your Document Creation Today with Templify!**
