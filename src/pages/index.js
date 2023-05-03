import Card from "../components/Card";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

export async function getStaticProps() {
  const maxPokemons = 251;
  const api = "https://pokeapi.co/api/v2/pokemon/";

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          <span>Poke</span>Next{" "}
        </h1>
        <Image
          src={"/images/pokeball.png"}
          width={40}
          height={40}
          alt="pokeball"
        />
      </div>
      <main className={styles.main}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </main>
    </div>
  );
}
