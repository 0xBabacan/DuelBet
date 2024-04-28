import hre from 'hardhat';
import { DuelContract } from "../typechain-types";

type BetDetails = {
  targetTimestamp: bigint;
  isCompleted: boolean;
}

const duelAddress = '0x89FCa5aB572721F67a9A7Ef61d9607441E15365d'
const scheduledBets: Map<bigint, BetDetails> = new Map()


function scheduleBetCompletion(betId: bigint, targetTimestamp: bigint, duelContract: DuelContract) {
  const delay = Number(targetTimestamp) * 1000 - Date.now();
  if (delay > 0) {
    setTimeout(async () => {
      try {
        const tx = await duelContract.finishBet(betId, 10); // TODO fix the second argument
        await tx.wait();
        
        const betDetails = scheduledBets.get(betId);

        if (!betDetails) {
          throw new Error(`Bet not found: betId=${betId.toString()}`);
        }

        betDetails.isCompleted = true;
        
        console.log(`Bet finished successfully: betId=${betId.toString()}`);
      } catch (error) {
        console.error(`Failed to finish bet: betId=${betId.toString()}, Error: ${error}`);
      }
    }, delay);
  }
}


async function rescheduleBets(duelContract: DuelContract) {
  if (!duelContract) {
    throw new Error('Contract not initialized');
  }

  scheduledBets.forEach(async (betDetails, betId) => {
    if (!betDetails.isCompleted) {
      // asynchrously schedule the bet completion
      scheduleBetCompletion(betId, betDetails.targetTimestamp, duelContract);
    } else {
      console.log(`Bet time already passed: betId=${betId}`);
    }
  });
}


async function listenToBetCreated() {
  const duelContract = await hre.ethers.getContractAt("MyContract", duelAddress) as unknown as DuelContract;

  console.log("Listening to BetCreated events...");

  duelContract.on(duelContract.filters.BetCreated(),
    (betId: bigint, player1: string, amount: bigint, targetPrice: bigint, isHigherChosen: boolean, targetTimestamp: bigint, event: any) => {
      console.log(`BetCreated: betId=${betId}, player1=${player1}, amount=${amount}, targetPrice=${targetPrice}, isHigherChosen=${isHigherChosen}, targetTimestamp=${targetTimestamp}`);

      scheduledBets.set(betId, {targetTimestamp, isCompleted: false});

      console.log(targetTimestamp)
      console.log(Date.now())

      scheduleBetCompletion(betId, targetTimestamp, duelContract);

    });

}


listenToBetCreated().catch(console.error);

