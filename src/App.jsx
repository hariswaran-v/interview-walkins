import { useForm } from "react-hook-form";
import FromButton from "./components/FormButton";
import Forminput from "./components/Forminput";
import FormSelect from "./components/FormSelect";
import FromTextarea from "./components/FormTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const formSchema = z.object({
  jobRole: z.string(),
  fullName: z.string().min(5).max(100),
  email: z.string().email(),
  address: z.string().min(10).max(130),
  qualification: z.string().min(3).max(130),
  comments: z.string().min(20).max(2000),
});

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [candidates, setCandidates] = useState([]);

  const COLLECTION_NAME = "candidate";

  const sendThisToServer = async (data) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    reset();
    // console.log(data);
  };

  useEffect(() => {
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      setCandidates(querySnapshot.docs.map((doc) => doc.data()));
      console.log(querySnapshot.docs[0].data());

      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`, doc.data());
      // });
      if (querySnapshot.docs.length === 0) {
        console.log("No record exist");
      }
    }
    getDataFromFirebase();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen ">
      <header className="bg-amber-500 px-10 py-5 text-center text-xl italic font-semibold ">
        Interview Scheduled Candidates
      </header>
      <main className="container mx-auto p-5">
        <section className="bg-white p-5 shadow rounded">
          <h2 className="font-semibold text-lg mb-5">
            Interview Scheduled Candidates
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit(sendThisToServer)}>
            <FormSelect
              name="jobRole"
              label="Job role"
              register={register("jobRole")}
            />
            <Forminput
              name="fullName"
              label="Full name"
              placeholder="Full name"
              register={register("fullName")}
              error={errors.fullName}
            />
            <Forminput
              name="email"
              label="Email"
              placeholder="Email"
              register={register("email")}
              error={errors.email}
            />
            <FromTextarea
              name="address"
              label="Address"
              placeholder="Address"
              register={register("address")}
              error={errors.address}
            />
            <Forminput
              name="qualification"
              label="Qualification"
              placeholder="Qualification"
              register={register("qualification")}
              error={errors.qualification}
            />
            <FromTextarea
              name="comments"
              label="Comments"
              placeholder="Comments"
              register={register("comments")}
              error={errors.comments}
            />
            <FromButton />
          </form>
        </section>
        {/* display values */}
        <section className="my-10">
          <div className="relative overflow-x-auto rounded">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4 ">{index + 1}</td>
                    <th className="px-6 py-4">{candidate.fullName}</th>
                    <td
                      scope="row"
                      className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-gray-400"
                    >
                      {candidate.jobRole}
                    </td>

                    <td className="px-6 py-4">{candidate.email}</td>
                    <td className="px-6 py-4">{candidate.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
