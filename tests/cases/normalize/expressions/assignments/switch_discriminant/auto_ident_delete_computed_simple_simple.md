# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete arg["y"])) {
  default:
    $(100);
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg.y;
let tmpSwitchTest = a;
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
const SSA_a = delete arg.y;
$(100);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
