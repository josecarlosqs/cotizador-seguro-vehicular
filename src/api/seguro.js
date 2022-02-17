import { randomInt } from '../helpers'

export const registrarSolicitud = () => {
  return new Promise (resolve => {
    setTimeout( () => {
      return resolve({
        success: true,
        data: {
          registrationId: randomInt(0, 5000)
        }
      })
    }, 750);
  });
}
