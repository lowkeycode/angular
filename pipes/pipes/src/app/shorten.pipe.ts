import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any){
    const wordsArray = value.split(" ");
    const lastWord = wordsArray.pop();
    const acronyms = wordsArray.map(word => word.slice(0, 1)).join("");
    return `${acronyms.toUpperCase()} ${lastWord.toUpperCase()}`;
  }
}