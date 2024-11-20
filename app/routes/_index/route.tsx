import type { MetaFunction } from "@remix-run/node";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "Thinking World" },
    {
      name: "description",
      content: "A lightweight and minimalistic web calendar to help you calculate your salary. Simply create an account and use Thinking World across all of your devices!",
    },
  ];
};

export default function Index() {
  return <DefaultLayout>Yeah!</DefaultLayout>;
}
