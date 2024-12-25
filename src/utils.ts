export function generateInnerHTML(word: string): string {
    const innerHTML = ` <style>
    .definition {
      background-color: #ffd700; /* A yellowish color */
      width: max-content;
    }
    .bubble {
      position: relative;
      padding: 20px;
      border-radius: 3px;
      margin-left: 20px;
    }
    .bubble:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -18px;
      right: 15px;
      width: 0;
      height: 0;
      border-top: 18px solid #ffd700; /* Match the yellowish background */
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
    }
  </style>
  <div class="definition bubble">
    ${word}
  </div>
`;
    return innerHTML;
}