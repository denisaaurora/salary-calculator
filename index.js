// Function to calculate salary
async function calculateSalary() {
    const email = document.getElementById('email').value;
    //const selectedDate = document.getElementById('datepicker').value;
    const name = document.getElementById('name');
    const totalProfitGenerat = document.getElementById('totalProfitGenerat');
    const venituriLivrari = document.getElementById('venituriLivrari');
    const cash = document.getElementById('cashBalance');
    const tips = document.getElementById('tips');
    const venituriLivrari1 = document.getElementById('venituriLivrari1');
    const cash1 = document.getElementById('cashBalance1');
    const tips1 = document.getElementById('tips1');
    const totalCompanyCommission = document.getElementById('totalCompanyCommission');
    const salaryBeforeTaxes = document.getElementById('salaryBeforeTaxes');
    const openAccountTax = document.getElementById('openAccountTax');
    const applicationTax = document.getElementById('applicationTax');
    const companyCommission = document.getElementById('companyCommission');
    const totalTaxesToPay = document.getElementById('totalTaxesToPay');
    const totalIncomeAfterTaxes = document.getElementById('totalIncomeAfterTaxes');
    const totalIncomeAndBalanceUnsubmitted = document.getElementById('totalIncomeAndBalanceUnsubmitted');


    if (!email) {
        alert('Please enter your email to retrieve data.');
        return;
    }

    // Assume you have a JSON file with user data, replace 'your_json_file.json' with the actual file name
    fetch("./Raport_20.11.2023_26.11.2023_dionisiuvalentin.i97@gmail.com.json")
        .then(response => response.json())
        .then(angajati => {

            // Find the user data based on the provided email
            const userFromDatabase = angajati.find(user => user.email === email);

            if (userFromDatabase) {

                name.textContent = userFromDatabase.nume;
                venituriLivrari.textContent = userFromDatabase.venituri;
                cash.textContent = Number(userFromDatabase.totalPlataCash).toFixed(2);
                tips.textContent = userFromDatabase.tips;

                venituriLivrari1.textContent = userFromDatabase.venituri;
                cash1.textContent = "- " + Number(userFromDatabase.totalPlataCash).toFixed(2);
                tips1.textContent = userFromDatabase.tips;
                const commissionRate = 0.12; // 12%

                function getTotalProfitGenerat() {
                    // Calculate total income
                    let sumTotalProfitGenerat = (Number(userFromDatabase.venituri) + Number(userFromDatabase.totalPlataCash) + Number(userFromDatabase.tips)).toFixed(2);
                    totalProfitGenerat.textContent = sumTotalProfitGenerat
                    return sumTotalProfitGenerat
                }

                // Calculate commission and total commission
                function totalComisionCompanie() {
                    let sumTotalComisionCompanie = (getTotalProfitGenerat() * commissionRate).toFixed(2);
                    totalCompanyCommission.textContent = sumTotalComisionCompanie
                    return sumTotalComisionCompanie
                }

                // Calculate total income before taxes
                function salariuInainteDeTaxe() {
                    let sumSalariuInainteDeTaxe = (Number(userFromDatabase.venituri) - Number(userFromDatabase.totalPlataCash) + Number(userFromDatabase.tips)).toFixed(2);
                    salaryBeforeTaxes.textContent = sumSalariuInainteDeTaxe
                    return sumSalariuInainteDeTaxe
                }

                // Calculate taxes
                if (userFromDatabase.taxaDeschidereCont === null) {
                    openAccountTax.textContent = '0'
                } else {
                    openAccountTax.textContent = userFromDatabase.taxaDeschidereCont
                }
                applicationTax.textContent = userFromDatabase.taxaAplicatie;
                companyCommission.textContent = totalComisionCompanie();

                function totalTaxeDePlatit() {
                    let sumTotalTaxeDePlatit = (Number(userFromDatabase.taxaDeschidereCont) + Number(userFromDatabase.taxaAplicatie) + Number(companyCommission.textContent)).toFixed(2);
                    totalTaxesToPay.textContent = sumTotalTaxeDePlatit
                    return sumTotalTaxeDePlatit
                }

                // Calculate total salary after taxes
                function salariuDupaTaxe() {
                    let totalIncomeAfterTaxesCalculate = (salariuInainteDeTaxe() - totalTaxeDePlatit()).toFixed(2);
                    totalIncomeAfterTaxes.textContent = userFromDatabase.salariuInainteDeTaxe + ' - ' + userFromDatabase.taxe + ' = ' + totalIncomeAfterTaxesCalculate;
                return totalIncomeAfterTaxesCalculate
                }

                //calculate final salary

                let salariuIncasatCashNedepus = (Number(salariuDupaTaxe()) + Number(userFromDatabase.totalPlataCash));
                console.log(salariuIncasatCashNedepus)
                totalIncomeAndBalanceUnsubmitted.textContent = salariuDupaTaxe() + ' + ' + userFromDatabase.totalPlataCash + ' = ' + salariuIncasatCashNedepus


            } else {
                alert('Data not found for the entered email.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
