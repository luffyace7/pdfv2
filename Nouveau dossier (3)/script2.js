let partiesContainer = document.createElement("div");
let employerInfo = document.createElement("div");
let employeeInfo = document.createElement("div");

partiesContainer.id = "partiesContainer";
employerInfo.id = "employerInfo";
employeeInfo.id = "employeeInfo";

document.body.appendChild(partiesContainer);
partiesContainer.appendChild(employerInfo);
partiesContainer.appendChild(employeeInfo);

// Create topInfo + bottomInfo for employer
let topInfoEmployer = document.createElement("div");
topInfoEmployer.classList = "topInfo";
employerInfo.appendChild(topInfoEmployer);

let bottomInfoEmployer = document.createElement("div");
bottomInfoEmployer.classList = "bottomInfo"
employerInfo.appendChild(bottomInfoEmployer);

// Create topInfo + bottomInfo for employee
let topInfoEmployee = document.createElement("div");
topInfoEmployee.classList = "topInfo";
employeeInfo.appendChild(topInfoEmployee);

let bottomInfoEmployee = document.createElement("div");
bottomInfoEmployee.classList = "bottomInfo"
employeeInfo.appendChild(bottomInfoEmployee);

// h6 employer and employee
let h6Employer = document.createElement("h6");
h6Employer.id = "h6Employer";
h6Employer.textContent = "employer informations";
topInfoEmployer.appendChild(h6Employer);

let h6Employee = document.createElement("h6");
h6Employee.id = "h6Employee";
h6Employee.textContent = "employee informations";
topInfoEmployee.appendChild(h6Employee);

// input personal
let employerNameInput = document.createElement("input");
employerNameInput.type = "text"
employerNameInput.placeholder = "name";
bottomInfoEmployer.appendChild(employerNameInput);

let employerSubnameInput = document.createElement("input");
employerSubnameInput.type = "text"
employerSubnameInput.placeholder = "subname";
bottomInfoEmployer.appendChild(employerSubnameInput)

let employeeNameInput = document.createElement("input");
employeeNameInput.type = "text"
employeeNameInput.placeholder = "name";
bottomInfoEmployee.appendChild(employeeNameInput);

let employeeSubnameInput = document.createElement("input");
employeeSubnameInput.type = "text"
employeeSubnameInput.placeholder = "subname";
bottomInfoEmployee.appendChild(employeeSubnameInput);

//database
let rules = [
    {
        art: "Durée",
        text: "La durée de ce contrat de travail est indéterminée, à compter du [date de début]."
    },
    {
        art: "Lieu",
        text: "Le lieu principal d'exécution du travail sera situé à [adresse du lieu de travail]. L'employé peut être amené à se déplacer ponctuellement en fonction des besoins de l'entreprise."
    },
    {
        art: "Heures",
        text: "Les heures de travail seront de [heure de début] à [heure de fin], du lundi au vendredi, avec une pause déjeuner de [durée de la pause] minutes."
    },
    {
        art: "Rémunération",
        text: "La rémunération mensuelle brute de l'employé sera de [montant de la rémunération] euros, payable en fin de mois. Cette rémunération inclut toutes les primes et avantages convenus."
    },
    {
        art: "Congés",
        text: "L'employé aura droit à [nombre de jours] jours ouvrables de congés payés par an, conformément aux dispositions légales en vigueur."
    },
    {
        art: "Télétravail",
        text: "L'employé est autorisé à effectuer du télétravail à raison de [nombre de jours] jours par semaine, sous réserve de l'accord préalable de son supérieur hiérarchique et des besoins opérationnels de l'entreprise."
    }
];

let containerRules = document.createElement("div");
containerRules.id = "containerRules";
document.body.appendChild(containerRules)

rules.forEach(element => {
    let divRule = document.createElement("div");
    divRule.id = element.art
    containerRules.appendChild(divRule);
    divRule.addEventListener("mouseover", select);
    divRule.addEventListener("mouseout", deselect);
    divRule.addEventListener("click", active);

    //ruleTop
    let ruleTop = document.createElement("div");
    ruleTop.id = "ruleTop"
    divRule.appendChild(ruleTop);

    //ruleTitle
    let ruleTitle = document.createElement("h1");
    ruleTitle.textContent = element.art;
    ruleTop.appendChild(ruleTitle)

    //ruleBottom
    let ruleBottom = document.createElement("div");
    ruleBottom.id = "ruleBottom"
    divRule.appendChild(ruleBottom);

    //ruleText
    let ruleText = document.createElement("p");
    ruleText.textContent = element.text
    ruleBottom.appendChild(ruleText);


    function select() {
        divRule.style.background = "rgb(240, 240, 240)"
    }

    function deselect() {
        divRule.style.background = "white"
    }

    function active() {
        // Assuming divRule is defined somewhere in your script
        if (divRule.style.outline === "rgb(81, 228, 147) solid 5px") {
            divRule.style.outline = "rgb(230, 230, 230) solid 5px";
        } else {
            divRule.style.outline = "rgb(81, 228, 147) solid 5px";
        }
    }
    
});

let buttonDownoload = document.createElement("button");
buttonDownoload.textContent = "download employment contract"
document.body.appendChild(buttonDownoload);

buttonDownoload.addEventListener("click", download);

function download() {

    let getInfoNameEmployer = employerNameInput.value;    
    let getInfoSubnameEmployer = employerSubnameInput.value;    
    let getInfoNameEmployee = employeeNameInput.value;    
    let getInfoSubnameEmployee = employeeSubnameInput.value;

    function getRuleText(ruleId) {
        let ruleElement = document.getElementById(ruleId);
        if (ruleElement.style.outline === "rgb(81, 228, 147) solid 5px") {
            let rule = rules.find(r => r.art === ruleId);
            return rule ? rule.text : null;
        }
        return null;
    }

    let selectedRulesText = rules.map(rule => getRuleText(rule.art)).filter(text => text !== null);

    let topText = "Entre " + getInfoNameEmployer +" " + getInfoSubnameEmployer + " d'une part, et " + getInfoNameEmployee + " " + getInfoSubnameEmployee + "d'autre part, il est convenu ce qui suit :";

    // Définition du document
    // Calcul de la largeur disponible pour le contenu en tenant compte des marges gauche et droite
    var contentWidth = 595.28 - 70 - 70; // Largeur de la page A4 (595.28 points) moins les marges gauche et droite

    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [
            { text: 'contrat de travail'.toUpperCase(), style: 'header', alignment: 'center' },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: contentWidth, y2: 0 }] },
            { text: topText, style: 'body', alignment: 'justify', margin: [0, 10, 0, 10] },
            ...selectedRulesText.map(text => ({ text: text, style: 'body', alignment: 'justify', margin: [0, 10, 0, 10] }))
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            body: {
                fontSize: 12,
                textTransform: 'uppercase'
            }
        },
        pageMargins: [70, 70, 70, 70]
    };
    pdfMake.createPdf(docDefinition).download('contrat_de_travail.pdf');
}