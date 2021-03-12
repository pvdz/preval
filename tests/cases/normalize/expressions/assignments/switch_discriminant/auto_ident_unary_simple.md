# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ((a = typeof x)) {
  default:
    $(100);
}
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = (a = typeof x);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(100);
    }
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpSwitchValue = a;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a, x);
`````

## Output

`````js filename=intro
$(100);
$('number', 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
