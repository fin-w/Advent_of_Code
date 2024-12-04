function assert(condition, errorMessage) {
    if (!condition) {
        throw new Error(errorMessage || "Assertion failed.");
    }
}

function runDay1Challenge1() {
    const data = JSON.parse(day1Data);
    const firstList = data.firstList.sort();
    const secondList = data.secondList.sort();
    let result = document.getElementById("day1Challenge1Result");
    let totalDifference = 0;

    assert(firstList.length === secondList.length);

    for (let i = 0; i < firstList.length; i++) {
        totalDifference += Math.max(firstList[i], secondList[i]) - Math.min(firstList[i], secondList[i]);
    }

    result.innerHTML = totalDifference;
}

function runDay1Challenge2() {
    const data = JSON.parse(day1Data);
    const frequencyInSecondList = {};
    let result = document.getElementById("day1Challenge2Result");
    let total = 0;

    data.secondList.forEach(e => { frequencyInSecondList[e] = (frequencyInSecondList[e] || 0) + 1; });
    data.firstList.forEach(e => { total += e * (frequencyInSecondList[e] || 0); });

    result.innerHTML = total;
}
