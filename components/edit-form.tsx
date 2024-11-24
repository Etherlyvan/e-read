"use client";
import { updateBook} from '@/lib/actions';
import { useActionState } from 'react';
import { SubmitButton } from '@/components/button';
import { Book } from '@prisma/client';

const EditForm = ({data}:{data:Book}) => { 
    const [state, formAction] = useActionState(updateBook.bind(null,data.id), null);
  return (
    <form action={formAction}>
        
        {/* Title/Name */}
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="title"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Title..."
          defaultValue={data.title}
        />
            <div aria-live="polite" aria-atomic="true">
                <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
            </div>
      </div>

        {/* Genre*/}
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="genre"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="Genre..."
          defaultValue={data.genre}
        />
        <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.genre}</p>
        </div>
      </div>

      {/* Upload Image */}
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>

      {/* Upload PDF */}
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="PDF"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.PDF}</p>
        </div>
      </div>

      {/* Button Upload */}
      <SubmitButton label = "update"/>
    </form>
  );
};

export default EditForm;
