# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete $(arg)["y"])) {
  default:
    $(100);
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const SSA_a = delete tmpDeleteCompObj['y'];
$(100);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
