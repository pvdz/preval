# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Switch default > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = arguments;
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
  a = arguments;
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const SSA_a = arguments;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
