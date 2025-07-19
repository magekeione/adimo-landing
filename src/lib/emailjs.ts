interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    console.log("Trimitere email prin SMTP...", data);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    const result = await response.json();
    console.log("Email trimis cu succes:", result);
  } catch (error) {
    console.error("Eroare la trimiterea email-ului:", error);
    throw error;
  }
};
