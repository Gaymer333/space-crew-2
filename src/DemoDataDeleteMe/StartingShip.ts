import { ShipNeed, ShipNeedIds } from "../types/ship";

type StartingShipProperties = {
  needs: ShipNeed[];
}

const StartingShip: StartingShipProperties = {
  needs: [
    { id: 'oxygen', name: 'Oxygen', value: 50, minValue: 0, maxValue: 100 },
    { id: 'power', name: 'Power', value: 50, minValue: 0, maxValue: 100 },
    { id: 'hull', name: 'Hull Integrity', value: 50, minValue: 0, maxValue: 100 },
    { id: 'fuel', name: 'Fuel', value: 50, minValue: 0, maxValue: 100 },
    { id: 'water', name: 'Water', value: 50, minValue: 0, maxValue: 100 },
  ]
}

export default StartingShip;