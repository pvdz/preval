# Preval test case

# dowhile1.md

> Normalize > Dce > Break > Dowhile1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  do {
    break;
  } while ($(true));
  $('keep');
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  {
    let tmpDoWhileFlag = true;
    while (tmpDoWhileFlag) {
      {
        break;
      }
      tmpDoWhileFlag = $(true);
    }
  }
  $(`keep`);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  let tmpDoWhileFlag = true;
  $(`keep`);
  tmpIfTest = $(true);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  $(`keep`);
  tmpIfTest = $(true);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'keep'
 - 3: true
 - 4: 'keep'
 - 5: true
 - 6: 'keep'
 - 7: true
 - 8: 'keep'
 - 9: true
 - 10: 'keep'
 - 11: true
 - 12: 'keep'
 - 13: true
 - 14: 'keep'
 - 15: true
 - 16: 'keep'
 - 17: true
 - 18: 'keep'
 - 19: true
 - 20: 'keep'
 - 21: true
 - 22: 'keep'
 - 23: true
 - 24: 'keep'
 - 25: true
 - 26: 'keep'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
