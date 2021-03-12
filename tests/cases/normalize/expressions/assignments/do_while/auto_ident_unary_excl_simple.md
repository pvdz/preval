# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = !arg));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || (a = !arg)) {
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
    const tmpNestedComplexRhs = !arg;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
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
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    a = false;
    tmpIfTest = false;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
 - 1: 100
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
