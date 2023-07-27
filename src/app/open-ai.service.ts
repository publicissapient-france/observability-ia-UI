import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from "../environments/environment";
import { filter, from, map, Subscription } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class OpenAiService {

  constructor() {
  }

  readonly configuration = new Configuration({
    apiKey : environment.openAIToken
  });
  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAPI(text: string) {
    console.log(text)
    return from(this.openai.createCompletion({
      model : environment.model,
      prompt : text,
      max_tokens : 256,
      temperature : 0.10,
      stop : ' END'
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text),
      map(data => data.replaceAll("\\n","<BR>")),
      map(data => data.replaceAll("\\r","<BR>")),
      map(data => data.replaceAll("due","<BR>due"))
    );
  }

}
