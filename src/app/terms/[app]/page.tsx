import { makeLegalRoute } from "@/lib/legalRoutes";

const route = makeLegalRoute("terms", "fr");

export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
