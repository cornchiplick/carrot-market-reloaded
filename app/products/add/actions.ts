"use server";

import {LIMIT_FILE_SIZE} from "@/lib/constants";

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  if (data.photo && data.photo instanceof File) {
    if (!data.photo.type.startsWith("image/")) {
      return;
    }

    if (data.photo.size > LIMIT_FILE_SIZE) {
      return;
    }
  } else {
    return;
  }

  console.log(data);
}
