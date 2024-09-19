import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  const handleForm = async (formData: FormData) => {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 5000));
  };

  return (
    <div className="flex flex-col gap-10 px-5 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Eamil" required errors={[]} />
        <FormInput name="password" type="password" placeholder="Password" required errors={[]} />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
