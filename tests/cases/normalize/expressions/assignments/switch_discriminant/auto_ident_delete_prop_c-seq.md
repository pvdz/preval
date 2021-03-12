# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete ($(1), $(2), $(arg)).y)) {
  default:
    $(100);
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
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
$(1);
$(2);
const tmpDeleteObj = $(arg);
const SSA_a = delete tmpDeleteObj.y;
$(100);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 100
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
