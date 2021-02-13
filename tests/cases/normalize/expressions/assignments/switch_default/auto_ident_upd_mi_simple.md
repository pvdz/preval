# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = --b;
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same