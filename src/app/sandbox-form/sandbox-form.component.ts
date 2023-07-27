import { Component } from '@angular/core';
import { Prompt } from "./prompt";
import { ObservabilityDataService } from "../observability-data.service";
import { ObservabilityForm } from "./observabilityForm";
import { OpenAiService } from "../open-ai.service";

@Component({
  selector: 'app-sandbox-form',
  templateUrl: './sandbox-form.component.html',
  styleUrls: ['./sandbox-form.component.css']
})
export class SandboxFormComponent{

  constructor(
    private observabilityDataService: ObservabilityDataService,
    private openAIService : OpenAiService
  ) {
  }
  model : ObservabilityForm = {
    service: "FOO",
    outage: "instance down",
    question: "How is my system running?"
  };
  openAIResponse : string = ""

  services = this.observabilityDataService.getServices()
  outages = this.observabilityDataService.getOutages(this.model.service)
  submitted = false;
  onSubmit() {
    var dataFromOpenAPI = this.openAIService.getDataFromOpenAPI(
      this.observabilityDataService.getContext(this.model.service,this.model.outage)
      + " ### " +
      this.model.question + " ->"
    );
    this.submitted = true;
    dataFromOpenAPI.subscribe(data => {
      console.log(data);
      this.openAIResponse = data
    })
  }

  serviceChange() {
    this.outages = this.observabilityDataService.getOutages(this.model.service)
  }
}
