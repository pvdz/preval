# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_unary_simple
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

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same