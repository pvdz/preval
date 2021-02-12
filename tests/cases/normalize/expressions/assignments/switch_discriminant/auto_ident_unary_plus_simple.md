# Preval test case

# auto_ident_unary_plus_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_unary_plus_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ((a = +x)) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedComplexRhs = +x;
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedComplexRhs = +x;
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(100);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
