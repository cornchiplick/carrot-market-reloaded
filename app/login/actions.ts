"use server";

export const handleForm = async (prevState: unknown, formData: FormData) => {
  console.log(prevState);
  console.log(formData);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["wrong password", "password too short"],
  };
};
