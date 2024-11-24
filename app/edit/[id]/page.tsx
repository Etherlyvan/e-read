import EditForm from "@/components/edit-form";
import { getBookById } from "@/lib/data";
import { notFound } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Paramst = Promise<{ slug: string[] }>


const EditPage = async ({ Paramst }: { Paramst: { id: string } }) => {
  const data = await getBookById(Paramst.id);
  if (!data) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
        <h1 className="text-2xl font-bold mb-5">Update Image</h1>
        <EditForm data={data} />
      </div>
    </div>
  );
};

export default EditPage;
