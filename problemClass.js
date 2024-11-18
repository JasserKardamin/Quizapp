export class problem {
  constructor(question, answer, choices) {
    this.question = question;
    this.answer = answer;
    this.choices = [...choices];
  }
}
