// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import scss from "./Upload.module.scss";

// interface IFormInput {
//   _id?: number,
//   title: string;
//   email: string;
//   file: string[];
// }

// interface ITodosDate {
//   _id: number;
//   title: string;
//   email: string;
//   img: string;
//   isCompleted: boolean;
// }
// const UploadFile = () => {
//   const { register: registerAdd, handleSubmit: handleSubmitAdd, reset } = useForm<IFormInput>();
//   const { register: registerEdit, handleSubmit: handleSubmitEdit } = useForm<IFormInput>();
//   const [data, setData] = useState<ITodosDate[]>([]);
//   const [edId, setEdId] = useState<number | null>(null);
//   const [edit, setEdit] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     setIsLoading(true);
//     const file = data.file[0];
//     const formData = new FormData();

//     formData.append("file", file);

//     const { data: responseImage } = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/upload/file`,
//       formData
//     );
//     const newData = {
//       title: data.title,
//       email: data.email,
//       img: responseImage.url,
//       isCompleted: false,
//     };
//     const { data: responseTodos } = await axios.post(
//       `${
//         import.meta.env.VITE_BACKEND_URL
//       }/251331a97875ec7a37511b4088176f71/form`,
//       newData
//     );
//     setIsLoading(false);
//     console.log(responseTodos);
//     setData(responseTodos);
//     reset();
//   };
//   console.log(data, "todos");

//   const fetchTodos = async () => {
//     try {
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_BACKEND_URL
//         }/251331a97875ec7a37511b4088176f71/form/`
//       );
//       setData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   async function removeTodos(_id: number | undefined | null) {
//     await axios.delete(
//       `${
//         import.meta.env.VITE_BACKEND_URL
//       }/251331a97875ec7a37511b4088176f71/form/${_id}`
//     );
//     fetchTodos();
//   }

//   // update
//   const updateTodosItem: SubmitHandler<IFormInput> = async (data) => {
//     try {
//       const file = data.file[0];
//       const formData = new FormData();

//       formData.append("file", file);

//       const { data: responseImage } = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/upload/file`,
//         formData
//       );

//       const updateDate = {
//         title: data.title,
//         img: responseImage.url,
//       }

//       const { data: responseTodos } = await axios.patch(`${
//         import.meta.env.VITE_BACKEND_URL
//       }/251331a97875ec7a37511b4088176f71/form/${edId}`, updateDate)
//       console.log(responseTodos);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className={scss.todos}>
//       <h1>Upload File</h1>
//       <div className={scss.cards}>
//       </div>
//       <form onSubmit={handleSubmitEdit(onSubmit)}>
//           <input
//             {...registerAdd("title", { required: true })}
//             placeholder="title"
//             type="text"
//           />
//           <input
//             placeholder="email"
//             {...registerAdd("email", {
//               required: true,
//               pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//             })}
//             type="text"
//           />
//           <input
//             className={scss.fileInp}
//             {...registerAdd("file", { required: true })}
//             type="file"
//           />
//           {isLoading ? (
//             <button disabled type="submit">
//               Downloading task..
//             </button>
//           ) : (
//             <button type="submit">Download task</button>
//           )}
//         </form>

//       <div>
//         {data !== null ? (
//           <div
//             className={scss.perfumes}
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "30px",
//               marginTop: "40px",
//             }}
//           >
//             {data.map((el, index) => (
//               <div key={index} className={scss.card}>
//                 {edit && el._id == edId ? (
//                  <div>
//                    <form onSubmit={handleSubmitEdit(onSubmit)}>
//                   <input
//                     {...registerEdit("title", { required: true })}
//                     placeholder="title"
//                     type="text"
//                   />
//                   <input
//                     placeholder="email"
//                     {...registerEdit("email", {
//                       required: true,
//                       pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     })}
//                     type="text"
//                   />
//                   <input
//                     className={scss.fileInp}
//                     {...registerEdit("file", { required: true })}
//                     type="file"
//                   />
//                   {isLoading ? (
//                     <button disabled type="submit">
//                       Downloading task..
//                     </button>
//                   ) : (
//                     <button type="submit">Download task</button>
//                   )}
//                 </form>

//                     <div className={scss.img}>
//                       <img src={el.img} alt="" />
//                     </div>
//                     <div className={scss.p}>
//                       <input
//                         // {...register("title", { required: true })}
//                         placeholder="New title"
//                         type="text"
//                       />
//                     </div>
//                     <input
//                       {...registerEdit("file", { required: true })}
//                       type="file"
//                     />

//                     <div className={scss.btns}>
//                       <button
//                         onClick={() => {
//                           handleSubmitEdit(onSubmit);
//                         }}
//                         color="secondary"
//                         aria-label="edit"
//                       >
//                         save
//                       </button>
//                     </div>
//                  </div>

//                 ) : (
//                   <>
//                   <div className={scss.img}>
//                       <img src={el.img} alt="" />
//                     </div>
//                     <div className={scss.p}>
//                       <input
//                         // {...register("title", { required: true })}
//                         placeholder="New title"
//                         type="text"
//                       />
//                     </div>
//                     <input
//                       {...registerAdd("file", { required: true })}
//                       type="file"
//                     />

//                     <div className={scss.btns}>
//                       <button
//                         onClick={() => {
//                           handleSubmitAdd(onSubmit);
//                         }}
//                         color="secondary"
//                         aria-label="edit"
//                       >
//                         save
//                       </button>
//                     </div>

//                     <div className={scss.img}>
//                       <img src={el.img} alt="" />
//                     </div>
//                     <div className={scss.p}>
//                       <p>{el.title}</p>
//                     </div>

//                     <div className={scss.btns}>
//                       <button
//                         onClick={() => {
//                           setEdId(el._id);
//                           setEdit(true);
//                         }}
//                         color="secondary"
//                         aria-label="edit"
//                       >
//                         edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           removeTodos(el._id);
//                         }}
//                       >
//                         delete
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>
//             <h1>loading...</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadFile;

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./Upload.module.scss";

interface IFormInput {
  _id?: number;
  title: string;
  email: string;
  file: string[];
}

interface IDataTodos {
  _id: number;
  title: string;
  email: string;
  img: string;
  isComplete: boolean;
}

const UploadFile = () => {
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset,
    setValue: setAddValue,
    formState : {isSubmitting: isSubmittingAdd}
  } = useForm<IFormInput>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setEditValue,
    formState: {isSubmitting: isSubmittingEdit}
  } = useForm<IFormInput>();

  const [data, setData] = useState<IDataTodos[]>([]);
  const [edId, setEdId] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseImage } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/upload/file`,
      formData
    );
    const newData = {
      title: data.title,
      email: data.email,
      img: responseImage.url,
      isCompleted: false,
    };
    const { data: responseTodos } = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/251331a97875ec7a37511b4088176f71/form`,
      newData
    );
    console.log(responseTodos);
    setData(responseTodos);
    reset();
  };
  console.log(data, "todos");

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/251331a97875ec7a37511b4088176f71/form`
      );
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  async function removeTodos(_id: number | undefined | null) {
    await axios.delete(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/251331a97875ec7a37511b4088176f71/form/${_id}`
    );
    fetchTodos();
  }

  const updateItem: SubmitHandler<IFormInput> = async (data) => {
    try {
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);

      const { data: responseImage } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/file`,
        formData
      );

      const updateData = {
        title: data.title,
        img: responseImage.url,
      };

      const { data: responseTodos } = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/251331a97875ec7a37511b4088176f71/form/${edId}`,
        updateData
      );

      console.log(responseTodos);
      setData(responseTodos);
      setEdit(false);
      setEdId(null);
    } catch (e) {
      console.table(e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (edit && edId !== null) {
      const itemToEdit = data.find((item) => item._id === edId);
      if (itemToEdit) {
        setEditValue("title", itemToEdit.title);
        setEditValue("email", itemToEdit.email);
      }
    }
  }, [edit, edId, data, setEditValue]);

  return (
    <div className={scss.todos}>
      <h1>Upload File</h1>
      <div className={scss.cards}>
        <form onSubmit={handleSubmitAdd(onSubmit)}>
          <input
            {...registerAdd("title", { required: true })}
            placeholder="title"
            type="text"
          />
          <input
            placeholder="email"
            {...registerAdd("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            type="text"
          />
          <input
            className={scss.fileInp}
            {...registerAdd("file", { required: true })}
            type="file"
          />
          {isSubmittingAdd ? (
            <button disabled type="submit">
              Downloading task..
            </button>
          ) : (
            <button type="submit">Download task</button>
          )}
        </form>
      </div>

      <div>
        {data !== null ? (
          <div
            className={scss.perfumes}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              marginTop: "40px",
            }}
          >
            {data.map((el, index) => (
              <div key={index} className={scss.card}>
                {edit && el._id === edId ? (
                  <form onSubmit={handleSubmitEdit(updateItem)}>
                    <div className={scss.img}>
                      <img src={el.img} alt="" />
                    </div>
                    <div className={scss.p}>
                      <input
                        {...registerEdit("title", { required: true })}
                        placeholder="New title"
                        type="text"
                      />
                      <input
                        {...registerEdit("email", { required: true })}
                        placeholder="New email"
                        type="text"
                      />
                    </div>
                    <input
                      {...registerEdit("file", { required: true })}
                      type="file"
                    />
                    <div className={scss.btns}>
                      <button type="submit" color="secondary" aria-label="edit">
                        save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEdit(false);
                          setEdId(null);
                        }}
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={scss.img}>
                      <img src={el.img} alt="" />
                    </div>
                    <div className={scss.p}>
                      <p>{el.title}</p>
                    </div>

                    <div className={scss.btns}>
                      {
                        isSubmittingEdit ? (
                          <button
                          disabled
                        onClick={() => {
                          setEdId(el._id);
                          setEdit(true);
                        }}
                        color="secondary"
                        aria-label="edit"
                      >
                        edit...
                      </button>
                        ) : (
                          <button
                        onClick={() => {
                          setEdId(el._id);
                          setEdit(true);
                        }}
                        color="secondary"
                        aria-label="edit"
                      >
                        edit
                      </button>
                        )
                      }
                      <button
                        onClick={() => {
                          removeTodos(el._id);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
