// Drug Dealer Job (RageMP Server-Side Code)
const drugDealers = new Map(); // Stores players' drug stock

mp.events.add("buyDrugs", (player) => {
    if (!drugDealers.has(player.id)) drugDealers.set(player.id, 0);

    let stock = drugDealers.get(player.id);
    if (stock >= 10) {
        player.outputChatBox("[DRUGS] You can't carry more drugs!");
        return;
    }

    drugDealers.set(player.id, stock + 1);
    player.outputChatBox("[DRUGS] You bought 1 kg of drugs!");
    player.call("updateDrugStock", [drugDealers.get(player.id)]);
});

mp.events.add("sellDrugs", (player) => {
    if (!drugDealers.has(player.id) || drugDealers.get(player.id) === 0) {
        player.outputChatBox("[DRUGS] You have no drugs to sell!");
        return;
    }

    let stock = drugDealers.get(player.id);
    drugDealers.set(player.id, stock - 1);
    player.outputChatBox("[DRUGS] You sold 1 kg of drugs!");
    player.call("updateDrugStock", [drugDealers.get(player.id)]);

    // A certain probability of police notification
    if (Math.random() < 0.2) {
        mp.players.forEach(p => {
            if (p.getVariable("job") === "police") {
                p.outputChatBox("[POLICE] A drug dealer has been detected in the city!");
            }
        });
    }
});
