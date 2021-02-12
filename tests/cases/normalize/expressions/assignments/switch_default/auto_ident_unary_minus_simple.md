# Preval test case

# auto_ident_unary_minus_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_unary_minus_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = -x;
}
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    a = -x;
  }
}
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    a = -x;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
