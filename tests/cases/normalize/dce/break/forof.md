# Preval test case

# forof.md

> Normalize > Dce > Break > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  for (let x of [10, 20]) {
    break;
    $('fail');
  }
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  for (let x of [10, 20]) {
    break;
    $(`fail`);
  }
}
$(`after`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    const tmpForOfDeclRhs = [10, 20];
    let x = undefined;
    for (x of tmpForOfDeclRhs) {
      break;
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    let x = undefined;
    const tmpForOfDeclRhs = [10, 20];
    for (x of tmpForOfDeclRhs) {
      break;
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
