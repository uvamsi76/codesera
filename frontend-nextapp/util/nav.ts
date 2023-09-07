import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

const router = useRouter();
export const nav = (page: Url) => {
      router.push(page);
};