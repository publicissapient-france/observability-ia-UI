import { Injectable } from '@angular/core';
import { SERVICES } from "./mocks/mock-services";
import { OUTAGES } from "./mocks/mock-outages";
import { OBSERVABILITIES_EVENTS } from "./mocks/mock-observabilitiesEvent";

@Injectable({
  providedIn: 'root'
})
export class ObservabilityDataService {

  constructor() { }

  getServices(): string[] {
    return SERVICES
  }

  getOutages(service: string): string[] | undefined {
    console.log(service)
    return OUTAGES.get(service)
  }

  getContext(service: string, outage: string){
    return OBSERVABILITIES_EVENTS.get(service + "-" + outage)
  }
}
