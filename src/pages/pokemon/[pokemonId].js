import Image from "next/image";
import styles from "@/styles/Pokemon.module.css";

export async function getStaticPaths() {
  const maxPokemons = 251;
  const api = "https://pokeapi.co/api/v2/pokemon/";

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  //paths
  const paths = data.results.map((pokemon, index) => {
    return {
      params: {
        pokemonId: (index + 1).toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { pokemonId } }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await res.json();

  return {
    props: {
      pokemon: data,
    },
  };
}

export default function Poke({ pokemon }) {
  console.log(pokemon);
  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        width={200}
        height={220}
        alt="foto do pokemon"
      />

      <div>
        <h3>Número:</h3>
        <p className={styles.id}>#{pokemon.id}</p>
      </div>

      <div>
        <h3>Tipo:</h3>

        <div className={styles.types_container}>
          {pokemon.types.map((poke, index) => (
            <span
              key={index}
              className={`${styles.type} ${styles["type_" + poke.type.name]}`}
            >
              {poke.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
}
