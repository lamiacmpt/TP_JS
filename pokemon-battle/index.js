const axios = require('axios');
const readline = require('readline');

// Fonction pour récupérer les infos d'un Pokémon via l'API
async function getPokemon(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.log("❌ Erreur : Pokémon introuvable !");
    return null;
  }
}

// Interface console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction principale du combat
async function startBattle(player, bot) {
  let playerHP = 300;
  let botHP = 300;

  const playerMoves = player.moves.slice(0, 5);
  const botMoves = bot.moves.slice(0, 5);

  console.log("\n⚔️ Le combat commence !");
  console.log("----------------------");

  while (playerHP > 0 && botHP > 0) {
    // Afficher les attaques disponibles
    console.log(`\n💥 Choisis une attaque :`);
    playerMoves.forEach((m, index) => {
      console.log(`${index + 1}. ${m.move.name}`);
    });

    // Attendre le choix du joueur
    const playerMoveIndex = await new Promise((resolve) => {
      rl.question("Ton choix (1-" + playerMoves.length + ") : ", (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < playerMoves.length) resolve(index);
        else resolve(0); // si mauvais choix, on prend la première attaque
      });
    });

    const playerMove = playerMoves[playerMoveIndex];

    // Attaque du bot (toujours aléatoire)
    const botMove = botMoves[Math.floor(Math.random() * botMoves.length)];

    // Dégâts aléatoires entre 10 et 50
    const playerDamage = Math.floor(Math.random() * 40) + 10;
    const botDamage = Math.floor(Math.random() * 40) + 10;

    // Précision (80% de chance de réussite)
    const playerHits = Math.random() < 0.8;
    const botHits = Math.random() < 0.8;

    // Attaque du joueur
    console.log(`\n👉 ${player.name.toUpperCase()} utilise ${playerMove.move.name}!`);
    if (playerHits) {
      botHP -= playerDamage;
      console.log(`💥 Coup réussi ! ${bot.name} perd ${playerDamage} HP`);
    } else {
      console.log(`😅 L'attaque échoue !`);
    }

    if (botHP <= 0) break;

    // Attaque du bot
    console.log(`\n🤖 ${bot.name.toUpperCase()} utilise ${botMove.move.name}!`);
    if (botHits) {
      playerHP -= botDamage;
      console.log(`💥 Coup réussi ! ${player.name} perd ${botDamage} HP`);
    } else {
      console.log(`😅 L'attaque échoue !`);
    }

    console.log(`\n❤️ ${player.name}: ${playerHP} HP | 🤖 ${bot.name}: ${botHP} HP`);
  }

  // Résultat du combat
  if (playerHP <= 0 && botHP <= 0) {
    console.log("\n⚔️ Égalité !");
  } else if (playerHP <= 0) {
    console.log(`\n❌ ${player.name} est K.O. ! Le bot gagne !`);
  } else {
    console.log(`\n🏆 ${bot.name} est K.O. ! Tu gagnes !`);
  }
}

// Interface console pour choisir le Pokémon
rl.question("Choisis ton Pokémon : ", async (playerChoice) => {
  const player = await getPokemon(playerChoice);
  if (!player) {
    rl.close();
    return;
  }

  const botNames = ['charmander', 'bulbasaur', 'squirtle', 'eevee', 'pikachu'];
  const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
  const bot = await getPokemon(randomBot);

  console.log(`\n🤖 Le bot choisit ${bot.name.toUpperCase()} !`);

  await startBattle(player, bot);
  rl.close();
});
