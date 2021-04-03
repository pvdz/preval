# Preval test case

# object_complex.md

> Normalize > While > Test > Object complex
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ({a: $(1), b: $(2)}) {
  $('loop');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ({ a: $(1), b: $(2) }) {
  $('loop');
}
$('after');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = $(2);
  const tmpIfTest = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
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
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = $(2);
  const tmpIfTest = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
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
 - 1: 1
 - 2: 2
 - 3: 'loop'
 - 4: 1
 - 5: 2
 - 6: 'loop'
 - 7: 1
 - 8: 2
 - 9: 'loop'
 - 10: 1
 - 11: 2
 - 12: 'loop'
 - 13: 1
 - 14: 2
 - 15: 'loop'
 - 16: 1
 - 17: 2
 - 18: 'loop'
 - 19: 1
 - 20: 2
 - 21: 'loop'
 - 22: 1
 - 23: 2
 - 24: 'loop'
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
