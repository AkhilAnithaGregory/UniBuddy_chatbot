import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

type NavigationButtonType = {
    path : string,
    variant : 'default | destructive | outline | secondary | ghost | link | null | undefined',
    name : string
}

export const NavigationButton = ({ path, variant, name }: NavigationButtonType) => {
  return (
    <Link to={path} className="w-full">
      <Button variant={variant}>{name}</Button>
    </Link>
  );
};
