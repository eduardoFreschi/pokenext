import Image from "next/image";
import styles from "@/styles/Card.module.css";
import Link from "next/link";

export default function Card({ pokemon }) {
  return (
    <div className={styles.card}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        width={150}
        height={180}
        alt="foto do pokemon"
      />
      <p>#{pokemon.id}</p>
      <h3>{pokemon.name}</h3>

      <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
        <a>Detalhes</a>
      </Link>
    </div>
  );
}
