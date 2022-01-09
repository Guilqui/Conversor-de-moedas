const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currenciesEl = document.querySelector('[data-js="currencies-container"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const valuePrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const url = 'https://v6.exchangerate-api.com/v6/362ee49ee3ac59a944f0a5ab/latest/USD'
const timerCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')

let internalExchangeRate = {}

console.log(url)

const getErrormessage = errorType => ({
    'unsupported-code' : 'Não teve suporte para o tipo de moeda solicitado.',
    'malformed-request' : 'Alguma parte de sua solicitação não segue a estrutura.',
    'invalid-key' : 'Chave API não e válida.',
    'inactive-account' : 'Seu endereço de e-mail nao foi confirmado ou conta inativa',
    'quota-reached' : 'Atingiu o número maximo de solicitações permitidas no seu plano.',
})[errorType] || 'Não foi possível obter as informações.'

const fetchExchangeRate = async () => {
    try {
       const response = await fetch(url)

       if(!response.ok){
           throw new Error('Sua conexão falhou. Não foi possível obter as informações.')
       }
       
       const exchangeRateData = await response.json()
       console.log(exchangeRateData)

       if(exchangeRateData.result === 'error'){
           throw new Error(getErrormessage(exchangeRateData['error-type']))                     
       }
      
       return exchangeRateData
    } catch (err){
        const div = document.createElement('div')
        const button = document.createElement('button')
                
        div.textContent = err.message
        div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
        div.setAttribute('role', 'alert')
        button.classList.add('btn-close')
        button.setAttribute('type', 'button')
        button.setAttribute('aria-label', 'Close')        
        
        button.addEventListener('click', () => {
            div.remove()
        })

        div.appendChild(button)
        currenciesEl.insertAdjacentElement('afterend', div)                
    }

}

const init = async () => {
    const exchangeRateData = await fetchExchangeRate()

    internalExchangeRate = { ...exchangeRateData}

    console.log(exchangeRateData)

    const getOptions = selectedCurrency => Object.keys(exchangeRateData.conversion_rates)
       .map(currency => `<option ${currency === selectedCurrency ? 'selected' : ''}>${currency}</option>`)
       .join('')

    currencyOneEl.innerHTML = getOptions('USD')
    currencyTwoEl.innerHTML = getOptions('BRL')

    convertedValueEl.textContent = exchangeRateData.conversion_rates.BRL.toFixed(2)
    valuePrecisionEl.textContent = `1 USD = ${exchangeRateData.conversion_rates.BRL} BRL`
}

timerCurrencyOneEl.addEventListener('input', e => {
    convertedValueEl.textContent = (e.target.value * internalExchangeRate.conversion_rates[currencyTwoEl.value]).toFixed(2)
})

 init()