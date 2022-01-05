const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')

const url = 'https://v6.exchangerate-api.com/v6/362ee49ee3ac59a944f0a5ab/latest/USD'

const getErrormessage = errorType => ({
    'unsupported-code' : 'Não teve suporte para o tipo de moeda solicitado.',
    'malformed-request' : 'Alguma parte de sua solicitação não segue a estrutura.',
    'invalid-key' : 'Chave API não e válida.',
    'inactive-account' : 'Seu endereço de e-mail nao foi confirmado ou conta inativa',
    'quota-reached' : 'Atingiu o número maximo de solicitações permitidas no seu plano.',
})[errorType] || 'Não foi possível obter as informações'
const fetchExchanedRate = async () => {
    try {
       const response = await fetch(url)
       const exchangeRateData = await response.json()

       if(exchangeRateData.result === 'error'){
           throw new Error(getErrormessage(exchangeRateData['error-type']))                     
       }
      
    } catch (err){
        alert(err.message)    
    }

}

fetchExchangeRate()

const option = `<option>oi</option>`

currencyOneEl.innerHTML = option
currencyTwoEl.innerHTML = option

console.log(currencyOneEl, currencyTwoEl)