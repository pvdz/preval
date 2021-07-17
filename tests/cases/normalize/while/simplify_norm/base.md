# Preval test case

# base.md

> Normalize > While > Simplify norm > Base
>
> Try to undo some of the damage that was necessary during loop normalizations

#TODO

## Input

`````js filename=intro
while (true) {
  const tmpIfTest = $('yes');
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Pre Normal

`````js filename=intro
while (true) {
  const tmpIfTest = $(`yes`);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(`yes`);
while (tmpIfTest) {
  tmpIfTest = $(`yes`);
}
`````

## Output

`````js filename=intro
let tmpIfTest = $(`yes`);
while (tmpIfTest) {
  tmpIfTest = $(`yes`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'yes'
 - 2: 'yes'
 - 3: 'yes'
 - 4: 'yes'
 - 5: 'yes'
 - 6: 'yes'
 - 7: 'yes'
 - 8: 'yes'
 - 9: 'yes'
 - 10: 'yes'
 - 11: 'yes'
 - 12: 'yes'
 - 13: 'yes'
 - 14: 'yes'
 - 15: 'yes'
 - 16: 'yes'
 - 17: 'yes'
 - 18: 'yes'
 - 19: 'yes'
 - 20: 'yes'
 - 21: 'yes'
 - 22: 'yes'
 - 23: 'yes'
 - 24: 'yes'
 - 25: 'yes'
 - 26: 'yes'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same