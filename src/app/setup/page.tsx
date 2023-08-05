"use client";
import CustomSelect from "@/components/forms/CustomSelect";
import { useAppSelector } from "@/redux/hooks";
import { Formik, FieldArray, Form } from "formik";
import Link from "next/link";

const initialValues = {
  forms: [
    {
      industry: "",
      department: "",
      technologies: [],
    },
  ],
};
interface SetupProps {}

export default function Setup({}: SetupProps) {
  const formState = useAppSelector((state) => state.formReducer);

  const industryOptions = formState.industries.map((industry) => ({
    label: industry,
    value: industry,
  }));

  const departmentOptions = formState.departments.map((department) => ({
    label: department,
    value: department,
  }));

  const technologyOptions = formState.technologies.map((technology) => ({
    label: technology,
    value: technology,
  }));

  return (
    <main className="container p-4 my-4 border-2 border-gray-300 rounded-md">
      <span className="text-3xl font-bold inline-block">Add Documents</span>
      <Link href="/" className="block mt-2 text-blue-600 mb-4 hover:underline">
        Edit Fields
      </Link>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          alert("View Data in console");
          console.log([...values.forms]);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <FieldArray name="forms">
              {({ push, remove }: { push: any; remove: any }) => (
                <div className=" grid lg:grid-cols-2 gap-4">
                  {values.forms.map((form, index) => (
                    <div key={index} className="flex flex-col space-y-[1rem]">
                      <CustomSelect
                        name={`forms[${index}].industry`}
                        options={industryOptions}
                        label="Industry"
                      />
                      <CustomSelect
                        name={`forms[${index}].department`}
                        options={departmentOptions}
                        label="Department"
                      />
                      <CustomSelect
                        name={`forms[${index}].technologies`}
                        options={technologyOptions}
                        label="Technologies"
                        isMulti
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          disabled={values.forms.length == 1}
                          type="button"
                          onClick={() => {
                            if (values.forms.length > 1) {
                              remove(index);
                            }
                          }}
                          className="disabled:opacity-40 py-3 px-5 bg-pink-600 rounded-sm text-white"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              industry: "",
                              department: "",
                              technologies: [],
                            })
                          }
                          className="py-3 px-5 bg-blue-600 rounded-sm text-white"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <button
              disabled={isSubmitting}
              type="submit"
              className="fixed shadow-md bottom-12 right-12 disabled:opacity-50 py-3 px-5 bg-green-600 rounded-sm text-white"
            >
              Submit Forms
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
