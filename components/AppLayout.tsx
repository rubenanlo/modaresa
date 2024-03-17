import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Container } from "./Container";
import Link from "next/link";
import logo from "../public/assets/logo.webp";
import Hero from "./Hero";
import { NavigationItem } from "../library/Interface";

const navigation: NavigationItem[] = [
  {
    id: "ruben-andino",
    name: "Ruben Andino",
    href: "https://ruben-andino.rawdev.io",
    target: "_blank",
    icon: UserIcon,
  },
  {
    id: "appointments",
    name: "Appointments",
    href: "/",
    icon: CalendarIcon,
    current: true,
  },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { route } = useRouter();

  return (
    <Container className="font-clash">
      {/* Static sidebar for desktop */}
      <Container.Flex
        className={{
          position: "hidden lg:fixed lg:z-50 lg:w-72",
          dimension: "lg:inset-y-0",
          flex: "lg:flex lg:flex-col",
          background: "bg-white",
        }}
      >
        <Container.Flex
          className={{
            flex: "grow flex-col gap-y-5",
            dimensions: "overflow-y-auto  px-6 pb-4",
            border: "border-r border-gray-primary",
          }}
        >
          <Container.Flex
            className={{ flex: "flex h-16 shrink-0 items-center" }}
          >
            <Container.Image
              className="h-8 w-auto"
              src={logo}
              alt="Your Company"
            />
          </Container.Flex>
          <Container.List
            list={navigation}
            role="list"
            currentBasis={route}
            className={{
              parent: "flex flex-1 flex-col gap-y-3",
              child:
                "text-gray-600 hover:text-white hover:bg-blue-primary rounded-md px-4 py-2",
            }}
            AdditionalComponent={Link}
          />
        </Container.Flex>
      </Container.Flex>

      <Container className="lg:pl-72 h-screen overflow-y-auto scrollbar">
        <Hero />
        <Container className="lg:px-10 max-w-6xl mx-auto">{children}</Container>
      </Container>
    </Container>
  );
};

export default AppLayout;
