# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch (delete $(arg)["y"]) {
  default:
    $(100);
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpSwitchTest = delete tmpDeleteObj.y;
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
const a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$(100);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
