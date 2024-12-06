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

function runDay2Challenge1() {
    const data = JSON.parse(day2Data);
    let result = document.getElementById("day2Challenge1Result");

    const numberOfSafeResults = data.readings.filter(e => {
        if (e[0] === e[1]) {
            return false;
        }
        const isAscendingValues = (e[0] < e[1]);
        for (let i = 1; i < e.length; i++) {
            const levelDifference = e[i] - e[i - 1];
            if (levelDifference === 0
                || levelDifference > 3
                || levelDifference < -3
                || (levelDifference < 0 && isAscendingValues)
                || (levelDifference > 0 && !isAscendingValues)) {
                return false;
            }
        }
        return true;
    }).length;

    result.innerHTML = numberOfSafeResults;
}

function d2C2ValidateLevels(arrayOfLevels) {
    if (arrayOfLevels[0] === arrayOfLevels[1]) {
        return false;
    }
    const isAscendingValues = (arrayOfLevels[0] < arrayOfLevels[1]);
    for (let i = 1; i < arrayOfLevels.length; i++) {
        const levelDifference = arrayOfLevels[i] - arrayOfLevels[i - 1];
        if (levelDifference === 0
            || levelDifference > 3
            || levelDifference < -3
            || (levelDifference < 0 && isAscendingValues)
            || (levelDifference > 0 && !isAscendingValues)) {
            return false;
        }
    }
    return true;
}

function runDay2Challenge2() {
    const data = JSON.parse(day2Data);
    let result = document.getElementById("day2Challenge2Result");

    const numberOfSafeResults = data.readings.filter(e => {
        if (d2C2ValidateLevels(e)) {
            return true;
        } else {
            for (let i = 0; i < e.length; i++) {
                let levelsWithoutOneLevel = e.toSpliced(i, 1);
                if (d2C2ValidateLevels(levelsWithoutOneLevel)) {
                    return true;
                }
            }
        }
        return false;
    }).length;

    result.innerHTML = numberOfSafeResults;
}

function runDay3Challenge1() {
    const data = document.getElementById("day3Data");
    const validDataRegex = /mul\(([0-9]+),([0-9]+)\)/g;
    let result = document.getElementById("day3Challenge1Result");
    let total = 0;

    while ((numbers = validDataRegex.exec(data.textContent)) !== null) {
        assert(numbers.length === 3);
        total += numbers[1] * numbers[2];
    }

    result.innerHTML = total;
}

function runDay3Challenge2() {
    const data = document.getElementById("day3Data");
    const validDataRegex = /(mul\(([0-9]+),([0-9]+)\)|do\(\)|don't\(\))/g;
    let result = document.getElementById("day3Challenge2Result");
    let isAllowedToMultiply = true;
    let total = 0;

    while ((command = validDataRegex.exec(data.textContent)) !== null) {
        if (command[0] === "do()") {
            isAllowedToMultiply = true;
        } else if (command[0] === "don't()") {
            isAllowedToMultiply = false;
        } else if (isAllowedToMultiply) {
            assert(command[0].startsWith("mul("));
            total += command[2] * command[3];
        }
    }

    result.innerHTML = total;
}
