import { CenteredLayout } from "~/components/wrappers/CenteredLayout";
import twImage from "../../../tw.png";

export default function Guide() {
  return <CenteredLayout>
    <div className="flex flex-col gap-y-7 mx-4 max-w-[40rem] text-black/80 dark:text-white/80">
      <h1 className="text-lg sm:text-3xl md:text-5xl font-title text-black dark:text-white">Welcome to the Thinking World Guide <span className="absolute"><img src={twImage} className="h-10 relative ml-3 mt-1" alt="Thinking World Logo" /></span></h1>

      <p>This comprehensive guide will explain everything there is to know about this simple web application. We will mainly focus on the functionality of the calendar service, but before that, let's go through some steps configuring your account.</p>

      <h2 className="text-lg sm:text-2xl md:text-3xl font-title text-black dark:text-white">Account Configuration</h2>

      <p>If you haven't logged in/signed up, navigate to the account settings using the navigation bar. To create a new account, simply enter your email address and a strong password. You will get a confirmation link in your inbox. Clicking on the link automatically logs you into your newly created account.</p>

      <p>Nullam eget sodales lectus, a sagittis nibh. Nulla vulputate interdum massa. Nunc sit amet auctor mi. Praesent euismod lobortis dolor. Morbi vel mattis quam. Ut laoreet velit urna, et accumsan est auctor in. Maecenas orci nunc, tristique a ipsum non, tincidunt tempus turpis. Pellentesque maximus, enim eu rhoncus ullamcorper, dolor tellus aliquet metus, a accumsan massa magna a tortor. Curabitur mattis justo non augue rhoncus tristique. Praesent ultrices hendrerit semper.</p>

      <p>Vivamus sapien nisi, placerat et consectetur nec, pellentesque sed ligula. Proin nec suscipit lacus. Praesent id lacus nisi. Nam ornare blandit diam sed blandit. Fusce aliquam arcu nec sem molestie viverra. Vivamus vel velit sapien. Cras eu est varius, iaculis purus sit amet, molestie felis. Nunc auctor risus nec dolor ultrices semper. In massa justo, elementum ut justo a, dictum pulvinar odio. Donec efficitur fringilla nisl, quis consequat ante rhoncus at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis rhoncus maximus orci in maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>

      <p>Nam ultricies velit ac risus volutpat sollicitudin. Praesent commodo ex sed sem commodo tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta convallis nisi, id pretium lectus cursus a. Cras et velit ac nulla auctor bibendum ut non diam. In justo tortor, vehicula eu mauris fringilla, malesuada consequat mi. Proin sit amet consequat tortor, a pharetra urna. Fusce vel ornare sapien. Proin vitae ante fringilla justo suscipit viverra.</p>

    </div>
  </CenteredLayout>;
}
