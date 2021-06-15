# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete arg[$("y")]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || delete arg[$(`y`)]) {
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
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $(`y`);
    tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
  if (tmpDoWhileFlag) {
  } else {
    const tmpDeleteCompProp = $(`y`);
    tmpIfTest = delete arg[tmpDeleteCompProp];
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
 - 2: 'y'
 - 3: 100
 - 4: 'y'
 - 5: 100
 - 6: 'y'
 - 7: 100
 - 8: 'y'
 - 9: 100
 - 10: 'y'
 - 11: 100
 - 12: 'y'
 - 13: 100
 - 14: 'y'
 - 15: 100
 - 16: 'y'
 - 17: 100
 - 18: 'y'
 - 19: 100
 - 20: 'y'
 - 21: 100
 - 22: 'y'
 - 23: 100
 - 24: 'y'
 - 25: 100
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
