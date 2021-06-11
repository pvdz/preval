# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (typeof $(arg));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || typeof $(arg)) {
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
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpUnaryArg = $(arg);
    tmpIfTest = typeof tmpUnaryArg;
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
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpDoWhileFlag) {
  } else {
    const tmpUnaryArg = $(1);
    tmpIfTest = typeof tmpUnaryArg;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
