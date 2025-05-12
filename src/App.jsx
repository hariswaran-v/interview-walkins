import { useForm } from "react-hook-form";
import FromButton from "./components/FormButton";
import Forminput from "./components/Forminput";
import FormSelect from "./components/FormSelect";
import FromTextarea from "./components/FormTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  jobRole: z.string(),
  fullName: z.string().min(5).max(100),
  email: z.string().email(),
  address: z.string().min(10).max(130),
  qualification: z.string().min(3).max(130),
  comments: z.string().min(200).max(2000),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const sendThisToServer = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-amber-500 px-10 py-5 text-center text-xl italic font-semibold ">
        Interview Scheduled Candidates
      </header>
      <main className="container mx-auto my-5">
        <section className="bg-white p-5 shadow rounded">
          <h2 className="font-semibold text-lg mb-5">
            Interview Scheduled Candidates
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit(sendThisToServer)}>
            <FormSelect name="jobRole" register={register("jobRole")} />
            <Forminput
              name="fullName"
              placeholder="Full name"
              register={register("fullName")}
              error={errors.fullName}
            />
            <Forminput
              name="email"
              placeholder="Email"
              register={register("email")}
              error={errors.email}
            />
            <FromTextarea
              name="address"
              placeholder="Address"
              register={register("address")}
              error={errors.address}
            />
            <Forminput
              name="qualification"
              placeholder="Qualification"
              register={register("qualification")}
              error={errors.qualification}
            />
            <FromTextarea
              name="comments"
              placeholder="Comments"
              register={register("comments")}
              error={errors.comments}
            />
            <FromButton />
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;
