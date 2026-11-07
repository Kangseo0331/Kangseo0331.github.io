import { createFileRoute } from "@tanstack/react-router";
import { home } from "../pages/home-page";

export const Route = createFileRoute("/")({
  component: home

});


