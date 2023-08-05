"use client";

import CustomInput from "@/components/forms/CustomInput";
import { AiFillDelete } from "react-icons/ai";
import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateFormValues } from "@/redux/features/form.slice";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

// initialize the form with empty values
const initialValues = {
  departments: [""],
  industries: [""],
  technologies: [""],
};

// data for testing purposes
const prefilled = {
  industries: [
    "Technology",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Agriculture",
    "Entertainment",
  ],
  departments: ["Human Resources", "Engineering", "Finance"],
  technologies: [
    "Artificial Intelligence",
    "Blockchain",
    "Cloud Computing",
    "Machine Learning",
    "Data Analytics",
    "Cybersecurity",
    "Virtual Reality",
  ],
};

export default function Home() {
  const [isUsingPrefilled, setIsUsingPrefilled] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <main className="container flex items-center justify-center h-screen w-screen">
      <Formik
        enableReinitialize
        initialValues={isUsingPrefilled ? prefilled : initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(updateFormValues({ formValue: values }));
          router.push("/setup");
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          departments: Yup.array()
            .of(Yup.string().required("Department is required"))
            .min(1, "At least one department is required"),
          industries: Yup.array()
            .of(Yup.string().required("Industry is required"))
            .min(1, "At least one industry is required"),
          technologies: Yup.array()
            .of(Yup.string().required("Technology is required"))
            .min(1, "At least one technology is required"),
        })}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="w-full min-w-[280px] max-w-[767px] px-4 py-8 border-2 border-gray-300 rounded-md max-h-[80vh] overflow-scroll">
            <span className="text-3xl font-bold inline-block mb-4">
              Add Fields
            </span>
            <div className="form-layout-one">
              <FieldArray
                name="departments"
                render={(arrayHelpers: any) => (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Departments</h2>
                    {values.departments.map((department, index) => (
                      <div key={index} className="my-2 flex gap-2">
                        <div className="w-full">
                          <CustomInput
                            type="text"
                            name={`departments.${index}`}
                            customRegex={/^[A-Za-z0-9 .'*]+$/}
                            customonchange={(e: any) =>
                              setFieldValue(
                                `departments.${index}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div
                          className={`bg-pink-600 ${
                            values.departments.length == 1 && "opacity-50"
                          } cursor-pointer rounded-md text-white flex items-center justify-center w-12 h-12`}
                          onClick={() =>
                            values.departments.length > 1 &&
                            arrayHelpers.remove(index)
                          }
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="text-sm text-blue-500"
                    >
                      Add Departments
                    </button>
                  </div>
                )}
              />

              <FieldArray
                name="industries"
                render={(arrayHelpers: any) => (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Industries</h2>
                    {values.industries.map((department, index) => (
                      <div key={index} className="my-2 flex gap-2">
                        <div className="w-full">
                          <CustomInput
                            type="text"
                            name={`industries.${index}`}
                            customRegex={/^[A-Za-z0-9 .'*]+$/}
                            customonchange={(e: any) =>
                              setFieldValue(
                                `industries.${index}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div
                          className={`bg-pink-600 ${
                            values.industries.length == 1 && "opacity-50"
                          } cursor-pointer rounded-md text-white flex items-center justify-center w-12 h-12`}
                          onClick={() =>
                            values.industries.length > 1 &&
                            arrayHelpers.remove(index)
                          }
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="text-sm text-blue-500"
                    >
                      Add Industry
                    </button>
                  </div>
                )}
              />

              <FieldArray
                name="technologies"
                render={(arrayHelpers: any) => (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Technologies</h2>
                    {values.technologies.map((department, index) => (
                      <div key={index} className="my-2 flex gap-2">
                        <div className="w-full">
                          <CustomInput
                            type="text"
                            name={`technologies.${index}`}
                            customRegex={/^[A-Za-z0-9 .'*]+$/}
                            customonchange={(e: any) =>
                              setFieldValue(
                                `technologies.${index}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div
                          className={`bg-pink-600 ${
                            values.technologies.length == 1 && "opacity-50"
                          } cursor-pointer rounded-md text-white flex items-center justify-center w-12 h-12`}
                          onClick={() =>
                            values.technologies.length > 1 &&
                            arrayHelpers.remove(index)
                          }
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                      className="text-sm text-blue-500"
                    >
                      Add Technology
                    </button>
                  </div>
                )}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsUsingPrefilled((prev) => !prev);
                  }}
                  type="button"
                  className="py-3 px-5 bg-pink-600 rounded-sm text-white"
                >
                  {isUsingPrefilled
                    ? "Remove Prefilled Values"
                    : "Use Prefilled Values"}
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="disabled:opacity-50 py-3 px-5 bg-blue-600 rounded-sm text-white"
                >
                  Update Fields
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
