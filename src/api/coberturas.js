export const fetchCoberturas = () => {
  return new Promise (resolve => {
    setTimeout( () => {
      return resolve({
        success: true,
        data: {
          'personal': [
            {
              id: 1,
              name: 'Llanta robada',
              description: 'He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis',
              amount: 15.00
            },
            
            {
              id: 2,
              name: 'Choque y/o pasarte la luz roja',
              description: 'He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis',
              amount: 20.00
            },
            {
              id: 3 ,
              name: 'Atropello en la vía Evitamiento ',
              description: 'He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis',
              amount: 50.00
            }
          ],
          'terceros': [],
          'extras': [],
        }
      });
    } , 520)
  });
}

export const fetchCoberturasData = () => {
  return new Promise (resolve => {
    setTimeout( () => {
      return resolve({
        success: true,
        data: {
          minInsuredAmount: 12500,
          maxInsuredAmount: 16500,
          baseAmount: 20
        }
      })
    }, 470);
  });
}
