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

function* directionsIterator() {
    yield 'North';
    yield 'NorthEast';
    yield 'East';
    yield 'SouthEast';
    yield 'South';
    yield 'SouthWest';
    yield 'West';
    yield 'NorthWest';
}

function day4CountXmasMatches(i, j, dataByLine) {
    let mPos = [i, j];
    let aPos = [i, j];
    let sPos = [i, j];
    let totalMatchesAroundPos = 0;
    const maxWidth = dataByLine[0].length;
    const maxHeight = dataByLine.length;

    const directions = directionsIterator();
    for (const direction of directions) {
        switch (direction) {
            case 'North':
                mPos = [i, j - 1];
                aPos = [i, j - 2];
                sPos = [i, j - 3];
                break;
            case 'NorthEast':
                mPos = [i + 1, j - 1];
                aPos = [i + 2, j - 2];
                sPos = [i + 3, j - 3];
                break;
            case 'East':
                mPos = [i + 1, j];
                aPos = [i + 2, j];
                sPos = [i + 3, j];
                break;
            case 'SouthEast':
                mPos = [i + 1, j + 1];
                aPos = [i + 2, j + 2];
                sPos = [i + 3, j + 3];
                break;
            case 'South':
                mPos = [i, j + 1];
                aPos = [i, j + 2];
                sPos = [i, j + 3];
                break;
            case 'SouthWest':
                mPos = [i - 1, j + 1];
                aPos = [i - 2, j + 2];
                sPos = [i - 3, j + 3];
                break;
            case 'West':
                mPos = [i - 1, j];
                aPos = [i - 2, j];
                sPos = [i - 3, j];
                break;
            case 'NorthWest':
                mPos = [i - 1, j - 1];
                aPos = [i - 2, j - 2];
                sPos = [i - 3, j - 3];
                break;
            default:
                throw new Error("Direction value not recognised");
        }

        // if the required position of the chars goes beyond the puzzle area, ignore this entry
        if (mPos[0] < 0 || mPos[0] >= maxWidth
            || mPos[1] < 0 || mPos[1] >= maxHeight
            || aPos[0] < 0 || aPos[0] >= maxWidth
            || aPos[1] < 0 || aPos[1] >= maxHeight
            || sPos[0] < 0 || sPos[0] >= maxWidth
            || sPos[1] < 0 || sPos[1] >= maxHeight) {
            continue;
        }

        if (dataByLine[mPos[0]].charAt(mPos[1]) === "M"
            && dataByLine[aPos[0]].charAt(aPos[1]) === "A"
            && dataByLine[sPos[0]].charAt(sPos[1]) === "S") {
            totalMatchesAroundPos += 1;
        }
    }
    return totalMatchesAroundPos;
}

function runDay4Challenge1() {
    const data = document.getElementById("day4Data");
    const dataByLine = data.innerText.split("\n")
    let result = document.getElementById("day4Challenge1Result");
    let totalMatches = 0;

    for (let i = 0; i < dataByLine.length; i++) {
        for (let j = 0; j < dataByLine[0].length; j++) {
            if (dataByLine[i][j] === "X") {
                totalMatches += day4CountXmasMatches(i, j, dataByLine);
            }
        }
    }

    result.innerHTML = totalMatches;
}

function day4IsMasInX(i, j, dataByLine) {
    const maxWidth = dataByLine[0].length;
    const maxHeight = dataByLine.length;

    // ensure the area to search is within the puzzle area
    if (i < 1 || i >= maxWidth || j < 1 || j + 1 >= maxHeight) {
        return false;
    }

    // NW, SE, SW, NE
    let surroundingPos = [[i - 1, j - 1], [i + 1, j + 1], [i - 1, j + 1], [i + 1, j - 1]];
    let nwToSeMatch = false;
    let swToNeMatch = false;

    // NW to SE
    switch (dataByLine[surroundingPos[0][1]].charAt(surroundingPos[0][0])) {
        case "M":
            if (dataByLine[surroundingPos[1][1]].charAt(surroundingPos[1][0]) === "S") {
                nwToSeMatch = true;
            }
            break;
        case "S":
            if (dataByLine[surroundingPos[1][1]].charAt(surroundingPos[1][0]) === "M") {
                nwToSeMatch = true;
            }
            break;
        default:
            break;
    }

    // SW to NE
    switch (dataByLine[surroundingPos[2][1]].charAt(surroundingPos[2][0])) {
        case "M":
            if (dataByLine[surroundingPos[3][1]].charAt(surroundingPos[3][0]) === "S") {
                swToNeMatch = true;
            }
            break;
        case "S":
            if (dataByLine[surroundingPos[3][1]].charAt(surroundingPos[3][0]) === "M") {
                swToNeMatch = true;
            }
            break;
        default:
            break;
    }

    if (nwToSeMatch && swToNeMatch) {
        return true;
    }
    return false;
}

function runDay4Challenge2() {
    const data = document.getElementById("day4Data");
    const dataByLine = data.innerText.split("\n")
    let result = document.getElementById("day4Challenge2Result");
    let totalMatches = 0;

    for (let j = 0; j < dataByLine.length; j++) {
        for (let i = 0; i < dataByLine[0].length; i++) {
            if (dataByLine[j][i] === "A" && day4IsMasInX(i, j, dataByLine)) {
                totalMatches += 1;
            }
        }
    }

    result.innerHTML = totalMatches;
}

function day5IsValidOrder(arrayEntry) {
    for (let i = 0; i < day5Rules.length; i++) {
        // if the current rule applies but the order is wrong
        if (arrayEntry.includes(day5Rules[i][0])
            && arrayEntry.includes(day5Rules[i][1])
            && arrayEntry.indexOf(day5Rules[i][0]) > arrayEntry.indexOf(day5Rules[i][1])) {
            return false;
        }
    }
    return true;
}

function runDay5Challenge1() {
    let result = document.getElementById("day5Challenge1Result");

    let total = day5Data.filter(e => {
        return day5IsValidOrder(e);
    }).map(e => {
        assert(e.length % 2 === 1);
        return e[(e.length - 1) / 2];
    }).reduce((partialSum, v) => partialSum + v, 0);

    result.innerHTML = total;
}

function day5FindAcceptableNumbersPriorTo(number, relevantRules) {
    return relevantRules.filter(r => (r[1] === number))
        .map(r => r[0]).flat();
}

function day5NumberCanBeNext(acceptableNumbersPrior, partialFinalOrdering) {
    for (n of partialFinalOrdering) {
        if (!acceptableNumbersPrior.includes(n)) {
            return false;
        }
    }
    for (n of acceptableNumbersPrior) {
        if (!partialFinalOrdering.includes(n)) {
            return false;
        }
    }
    return true;
}

function runDay5Challenge2() {
    let result = document.getElementById("day5Challenge2Result");

    let total = day5Data.filter(e => {
        return !day5IsValidOrder(e);
    }).map(e => {
        const relevantRules = day5Rules.filter(r => {
            if (e.includes(r[0]) && e.includes(r[1])) {
                return true;
            }
            return false;
        });

        var finalOrdering = [];
        // at absolute most this should need e.length
        // runs through the list to correctly order everything
        for (var i = 0; i < e.length; i++) {
            for (number of e) {
                if (finalOrdering.includes(number)) {
                    continue;
                }
                const acceptableNumbersPrior = day5FindAcceptableNumbersPriorTo(number, relevantRules);
                if (day5NumberCanBeNext(acceptableNumbersPrior, finalOrdering)) {
                    finalOrdering.push(number);
                }
            }
        }

        assert(day5IsValidOrder(finalOrdering) && finalOrdering.length === e.length);
        return finalOrdering;
    }).map(e => {
        assert(e.length % 2 === 1);
        return e[(e.length - 1) / 2];
    }).reduce((partialSum, v) => partialSum + v, 0);

    result.innerHTML = total;
}
