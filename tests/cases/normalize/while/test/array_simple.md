# Preval test case

# array_simple.md

> Normalize > While > Test > Array simple
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ([1, 2, 3]) {
  $('loop');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ([1, 2, 3]) {
  $('loop');
}
$('after');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = [1, 2, 3];
  if (tmpIfTest) {
    $('loop');
  } else {
    break;
  }
}
$('after');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = [1, 2, 3];
  if (tmpIfTest) {
    $('loop');
  } else {
    break;
  }
}
$('after');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'loop'
 - 2: 'loop'
 - 3: 'loop'
 - 4: 'loop'
 - 5: 'loop'
 - 6: 'loop'
 - 7: 'loop'
 - 8: 'loop'
 - 9: 'loop'
 - 10: 'loop'
 - 11: 'loop'
 - 12: 'loop'
 - 13: 'loop'
 - 14: 'loop'
 - 15: 'loop'
 - 16: 'loop'
 - 17: 'loop'
 - 18: 'loop'
 - 19: 'loop'
 - 20: 'loop'
 - 21: 'loop'
 - 22: 'loop'
 - 23: 'loop'
 - 24: 'loop'
 - 25: 'loop'
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same