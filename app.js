const responses = {
    amd: {
        input1: {
            '7': "2023",
            '8': "2024",
            '9': "2025"
        },
        input2: {
            '1': "Athlon Silver - Low Tier",
            '2': "Athlon Gold - Low Tier",
            '3': "Ryzen 3 - Low/Mid Tier",
            '4': "Ryzen 3 - Low/Mid Tier",
            '5': "Ryzen 5 - Mid Tier",
            '6': "Ryzen 5 - Mid Tier",
            '7': "Ryzen 7 - High Tier",
            '8': "Ryzen 7/9 - High/Ultra High Tier",
            '9': "Ryzen 9 - Ultra High Tier"
        },
        input3: {
            '1': "Zen 1/Zen+ released 04/2018",
            '2': "Zen 2 released 07/2019",
            '3': "Zen 3/Zen 3+ released 2020/2023",
            '4': "Zen 4 released 09/2022",
            '5': "Zen 5 released 07/2024"
        },
        input4: {
            '0': "Lower Model within segment",
            '5': "Upper Model within segment"
        },
        input5: {
            'h': "",
            'hx': "55W+ Max Performance",
            'hs': "35W+ Thin Gaming/Creator",
            'u': "15-28W Premium Ultrathin",
            'c': "15-28W Chromebook",
            'e': "9W Fanless variant of 'U'"
        }
    },
    intel: {
        input1: {
            'i3': "i3",
            'i5': "i5",
            'i7': "i7",
            'i9': "i9",
            '3': "3",
            '5': "5",
            '7': "7",
            '9': "9"
        },
        input2: {
            '4': "4th Gen, June 2013, Haswell",
            '5': "5th Gen, January 2015, Broadwell",
            '6': "6th Gen, August 2015, Skylake",
            '7': "7th Gen, January 2017, Kaby Lake",
            '8': "8th Gen, August 2017, Kaby Lake R/Coffe Lake",
            '9': "9th Gen, October 2018, Coffe Lake Refresh",
            '10': "10th Gen, Comet Lake/Ice Lake, May 2019/April 2020",
            '11': "11th Gen, September 2020, Tiger Lake",
            '12': "12th Gen, November 2021, Alder Lake",
            '13': "13th Gen, October 2022, Raptor Lake",
            '14': "14th Gen, October 2023, Raptor Lake-S Refresh"
        },
        input3: {
            '1': "Zen 1/Zen+",
            '2': "Zen 2",
            '3': "Zen 3/Zen 3+",
            '4': "Zen 4",
            '5': "Zen 5"
        },
        input4: {
            'k': "High performance, unlocked",
            'f': "Requires discrete graphics",
            's': "Special Edition",
            't': "Power-optimized lifestyle",
            'x': "High performance, unlocked",
            'xe': "High performance, unlocked",
            'hx': "Highest performance, all SKUs unlocked",
            'hk': "Highest performance, all SKUs unlocked -> HX above",
            'h': "Highest performance -> HK and HX above",
            'p': "Performance optimized for thin and light laptops",
            'u': "Power efficient",
            'y': "Extremely low-power efficient",
            'g1': "Graphics level 1 of 7 (processors with newer integrated graphics technology)",
            'g2': "Graphics level 2 of 7 (processors with newer integrated graphics technology)",
            'g3': "Graphics level 3 of 7 (processors with newer integrated graphics technology)",
            'g4': "Graphics level 4 of 7 (processors with newer integrated graphics technology)",
            'g5': "Graphics level 5 of 7 (processors with newer integrated graphics technology)",
            'g6': "Graphics level 6 of 7 (processors with newer integrated graphics technology)",
            'g7': "Graphics level 7 of 7 (processors with newer integrated graphics technology)",
            'e': "Embedded",
            'ue': "Power efficient",
            'he': "High performance",
            'ul': "Power efficient, in LGA package",
            'hl': "Highest performance, in LGA package"
        }
    }
};

function updateResults(event, type) {
    const currentInput = event.target;
    const inputId = currentInput.id;
    const inputValue = currentInput.value.trim().toLowerCase();
    const inputNumber = parseInt(inputId.replace(`input${type}`, ''));
    const typeResponses = responses[type.toLowerCase()][`input${inputNumber}`];

    if (!typeResponses.hasOwnProperty(inputValue)) {
        currentInput.value = '';
    } else if (inputValue == 'hs' || inputValue == 'hx') {
        currentInput.style.fontSize = (inputValue.length > 1) ? '8rem' : '100px';
        if (['hs', 'hx'].includes(inputValue)) currentInput.blur();
    }

    document.getElementById(`response${type}` + inputNumber).innerText = typeResponses[inputValue] || '';

    if (inputNumber < (type === 'Amd' ? 5 : 4)) {
        if (typeResponses.hasOwnProperty(inputValue)) {
            document.getElementById(`input${type}` + (inputNumber + 1)).focus();
        }
    }
}

['Amd', 'Intel'].forEach(type => {
    for (let i = 1; i <= (type === 'Amd' ? 5 : 4); i++) {
        document.getElementById(`input${type}${i}`).addEventListener('input', event => updateResults(event, type));
    }
    document.getElementById(`input${type}1`).addEventListener('input', event => updateResults(event, type)); // Initial call to update results
});
