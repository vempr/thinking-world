import { CenteredLayout } from "~/components/wrappers/CenteredLayout";
import twImage from "../../../tw.png";
import { Link } from "@remix-run/react";

function A({ to, children }: { to: string, children: React.ReactNode }) {
  return <Link to={to} className="text-blue-400 underline hover:text-blue-500" prefetch="intent">{children}</Link>;
}

function Id({ id }: { id: string }) {
  return <span><Link to={`/guide#${id}`} className="text-blue-400 underline hover:text-blue-500 opacity-90" prefetch="intent">#</Link></span>;
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-4">{children}</div>
}

function Comment({ children }: { children: React.ReactNode }) {
  return <p className="border-l-4 pl-2"><span className="opacity-80 italic">{children}</span></p>
}

export default function Guide() {
  return <CenteredLayout smallPadding>
    <div className="flex flex-col gap-y-7 mx-5 max-w-[40rem] text-black/85 dark:text-white/85">
      <h1 className="text-3xl md:text-5xl font-title text-black dark:text-white">Welcome to the Thinking World Guide <span className="absolute"><img src={twImage} className="hidden md:block h-10 relative ml-3 mt-1" alt="Thinking World Logo" /></span></h1>

      <p>This comprehensive guide will explain everything there is to know about this simple web application. The main objective of Thinking World is to help calculate your income, for someone who works a "marginal part-time"/mini job. We will mainly focus on the functionality of the calendar service, but before that, let's go through some steps configuring your account.</p>

      <h2 id="config" className="text-2xl md:text-3xl font-title text-black dark:text-white">Account Configuration <Id id="config" /></h2>

      <Section>
        <p>If you haven't logged in/signed up, navigate to the account settings using the navigation bar. To create a new account, simply enter your email address and a strong password. You will get a confirmation link in your inbox. Clicking on the link automatically logs you into your newly created account.</p>

        <p>You can easily <A to="/forgot-password">reset your password</A> in case you forgot or want to change it. The <A to="/account">account settings</A> page will help you configure and change the linked email address and password.</p>
      </Section>

      <h2 id="calendar" className="text-2xl md:text-3xl font-title text-black dark:text-white">Calendar Functionality <Id id="calendar" /></h2>

      <Section>
        <p>When starting with a fresh account, there are no work shift templates avaliable for you to use. Use the work shifts sidebar to create your first work shift template by filling out a form. You can edit and delete each work shift template with the buttons attached to each card.</p>

        <Comment><span className="text-red-500">Caution</span>: Deleting a work shift template will erase all records of that work shift template in your calendar! Rename a work shift template to "x (old)" or assign it a dark color to symbolize an unused template and prevent unintentional data loss.</Comment>

        <p>For desktop users, there are two ways to add work shift records to a specific day. You can click on any day on the calendar and choose <span className="border outline-1 outline-dashed p-0.5 rounded-md font-bold">Add created work shift</span> to insert a certain work shift template. Additionally, you can toggle <span className="text-sky-500">Drag and Drop</span> mode using the work shifts sidebar to conveniently drag work shifts onto any day.</p>

        <Comment><span className="text-sky-500">Drag and Drop</span> mode is currently unsupported for mobile devices.</Comment>

        <p>To add miscellaneous events, click on any day and choose <span className="border outline-1 outline-dashed p-0.5 rounded-md font-bold">Add new events</span>. At least one event will always be shown on the calendar interface.</p>

        <p>The calendar will show at most two entries for each day. Days with more than two entries (work shift records and events) are hinted with "..." below the two entries. To view all entries in a given day, simply click on that day. You can then also edit and delete work shift records/events once viewing the entries.</p>
      </Section>

      <h2 id="insights" className="text-2xl md:text-3xl font-title text-black dark:text-white">Insights & Calculations <Id id="insights" /></h2>

      <Section>
        <p>Below the calendar is an insights section. It will tell you your total work hours and total pay for the month, as well as show an informative table about each of your work shifts.</p>

        <div className="my-3 w-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Work Shift{" "}
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Hours Worked
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Salary{"    "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0 even:bg-gray-200/50 dark:even:bg-neutral-800/40">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  Babysitting
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2.0
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  30.00
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-gray-200/50 dark:even:bg-neutral-800/40">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  Cashier
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  20.0
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  280.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <h2 id="conclusion" className="text-2xl md:text-3xl font-title text-black dark:text-white">And... <Id id="conclusion" /></h2>

      <p>That's pretty much it! This was my attempt at building a functional and practical calendar app, which I can use in my own time to boost my productivity. I would be happy if you decide to play around with Thinking World, as I think it is a very lightweight and minimalistic web calendar application. <span className="text-sky-500">Until then, see you around!</span></p>
    </div>
  </CenteredLayout>;
}
