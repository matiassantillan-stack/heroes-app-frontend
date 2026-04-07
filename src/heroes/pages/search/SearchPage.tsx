import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { SearchControls } from "./ui/SearchControls";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroStats } from "@/heroes/components/HeroStats";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Busqueda de SuperHeroes"
        descripcion="Descubre, explora y administra super heroes y villanos"
      />

      {/*Breadcrumb*/}
      <CustomBreadcrumbs
        currentPage="Buscador de Heroes"
        // breadcrumbs={[
        //   { label: "Home1", to: "/" },
        //   { label: "Home2", to: "/" },
        //   { label: "Home3", to: "/" },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      {/* Card from Search */}
      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
