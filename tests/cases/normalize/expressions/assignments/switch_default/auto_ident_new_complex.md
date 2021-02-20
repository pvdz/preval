# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new ($($))(1);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpNewCallee = $($);
  a = new tmpNewCallee(1);
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpNewCallee = $($);
const SSA_a = new tmpNewCallee(1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
