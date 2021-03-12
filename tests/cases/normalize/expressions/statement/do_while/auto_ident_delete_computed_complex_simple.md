# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete $(arg)["y"]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || delete $(arg)['y']) {
    tmpDoWhileFlag = false;
    {
      $(100);
    }
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpDeleteObj = $(arg);
    tmpIfTest = delete tmpDeleteObj.y;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpDeleteObj = $(arg);
    tmpIfTest = delete tmpDeleteObj.y;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 100
 - 4: {}
 - 5: 100
 - 6: {}
 - 7: 100
 - 8: {}
 - 9: 100
 - 10: {}
 - 11: 100
 - 12: {}
 - 13: 100
 - 14: {}
 - 15: 100
 - 16: {}
 - 17: 100
 - 18: {}
 - 19: 100
 - 20: {}
 - 21: 100
 - 22: {}
 - 23: 100
 - 24: {}
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
