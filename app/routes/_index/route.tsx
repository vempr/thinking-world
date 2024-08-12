import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Thinking World" },
    {
      name: "description",
      content: "Calendar for tracking work shifts, holidays and more!",
    },
  ];
};

export default function Index() {
  return <div>Yeah!</div>;
}
