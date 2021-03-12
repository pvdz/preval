# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > While > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
while ((a = typeof $(x))) $(100);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while ((a = typeof $(x))) $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(1);
  a = typeof tmpUnaryArg;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
