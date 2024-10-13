"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {useFormState} from "react-dom";
import {getUploadUrl, uploadProduct} from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {files},
    } = event;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    const {success, result} = await getUploadUrl();
    if (success) {
      const {id, uploadURL} = result;
      setUploadUrl(uploadURL);
      setImageId(id);
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    // upload image to cloudflare
    const file = formData.get("photo");
    if (!file) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      return;
    }

    // replace 'photo' in formData
    const photoUrl = `https://imagedelivery.net/iZyA_W41y4aQU_gSa-cmmA/${imageId}`;
    formData.set("photo", photoUrl);

    // call upload product
    return uploadProduct(_, formData);
  };
  const [state, action] = useFormState(interceptAction, null);

  return (
    <div>
      <form action={action} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-cover bg-center text-neutral-300"
          style={{
            backgroundImage: `url(${preview})`,
          }}>
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-sm text-neutral-400">
                사진을 추가해주세요.
                {state?.fieldErrors.title}
              </div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          required
          placeholder="가격"
          type="number"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          required
          placeholder="자세한 설명"
          type="text"
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
