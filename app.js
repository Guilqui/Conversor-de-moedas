const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currenciesEl = documento.querySelector('[data-js="currencies-container"]')

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

       if(!responde.ok){
           throw new Error('Sua conexão falhou. Não foi possível obter as informações.')
       }
       
       const exchangeRateData = await response.json()

       if(exchangeRateData.result === 'error'){
           throw new Error(getErrormessage(exchangeRateData['error-type']))                     
       }
      
       return exchangeRateData
    } catch (err){
        const div = document.createElement('div')
        const button = document.createElement('button')
                
        div.textContent = err.message
        div.setAttribute('role', 'alert')
        div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
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
    console.log(await fetchExchangeRate())
    
    const option = `<option>oi</option>`
    
    currencyOneEl.innerHTML = option
    currencyTwoEl.innerHTML = option
}

 init()