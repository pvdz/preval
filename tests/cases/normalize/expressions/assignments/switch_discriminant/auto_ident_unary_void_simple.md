# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_unary_void_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ((a = void arg)) {
  default:
    $(100);
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same