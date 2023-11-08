"use client"

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = () => {
    setIsLoading(true);
    router.push("select-hero");
  }

  return (
    <Container className="grid justify-center min-h-[90vh]">
      <div className={cn("duration-300 flex flex-col justify-center items-center", isLoading && "opacity-0")}>
        <h1 className="w-full text-center text-5xl uppercase m-5 drop-shadow-lg"><strong>Bem vindo a Jornada do Heroi</strong></h1>
        <Button className="animate-bounce" onClick={handleOnClick}>
          Continuar
        </Button>
      </div>
    </Container>
  )
}
