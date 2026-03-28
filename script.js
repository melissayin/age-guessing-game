let scores = [];

function createGroups() {
    const n = parseInt(document.getElementById("numGroups").value);
    scores = Array(n).fill(0);

    const container = document.getElementById("groupInputs");
    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
        const div = document.createElement("div");
        div.className = "group-row";
        div.innerHTML = `
            <strong>Group ${i+1}</strong>
            <input type="number" id="low${i}" placeholder="Lower bound">
            <input type="number" id="high${i}" placeholder="Upper bound">
        `;
        container.appendChild(div);
    }

    updateLeaderboard();
    document.getElementById("game").style.display = "block";
}

function scoreRound() {
    const trueValue = parseFloat(document.getElementById("trueValue").value);

    for (let i = 0; i < scores.length; i++) {
        const low = parseFloat(document.getElementById(`low${i}`).value);
        const high = parseFloat(document.getElementById(`high${i}`).value);

        const width = high - low;

        if (low <= trueValue && trueValue <= high) {
            scores[i] += Math.max(0, 21 - width);
        }
    }

    updateLeaderboard();
}

function updateLeaderboard() {
    const table = document.getElementById("leaderboard");
    table.innerHTML = "<tr><th>Group</th><th>Score</th></tr>";

    // array of [groupNumber, score]
    let ranked = [];
    for (let i = 0; i < scores.length; i++) {
        ranked.push([i + 1, scores[i]]);
    }

    ranked.sort(function(a, b) {
        return b[1] - a[1]; 
    });


    for (let i = 0; i < ranked.length; i++) {
        let group = ranked[i][0];
        let score = ranked[i][1];

        let row = document.createElement("tr");
        row.innerHTML = "<td>Group " + group + "</td><td>" + score.toFixed(1) + "</td>";
        table.appendChild(row);
    }
}

