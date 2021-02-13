# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > switch_default > auto_base_assign_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = b = $(2);
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
    const tmpNestedComplexRhs = $(2);
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
    const tmpNestedComplexRhs = $(2);
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same