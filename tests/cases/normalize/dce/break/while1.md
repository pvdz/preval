# Preval test case

# while1.md

> Normalize > Dce > Break > While1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  while ($(true)) {
    break;
  }
  $('keep');
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  while ($(true)) {
    break;
  }
  $(`keep`);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpUnaryArg = $(true);
  let tmpIfTest$1 = !tmpUnaryArg;
  $(`keep`);
  tmpIfTest = $(true);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  $(true);
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
 - 2: true
 - 3: 'keep'
 - 4: true
 - 5: true
 - 6: 'keep'
 - 7: true
 - 8: true
 - 9: 'keep'
 - 10: true
 - 11: true
 - 12: 'keep'
 - 13: true
 - 14: true
 - 15: 'keep'
 - 16: true
 - 17: true
 - 18: 'keep'
 - 19: true
 - 20: true
 - 21: 'keep'
 - 22: true
 - 23: true
 - 24: 'keep'
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
