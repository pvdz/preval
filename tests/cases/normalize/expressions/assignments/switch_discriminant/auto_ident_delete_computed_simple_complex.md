# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete arg[$("y")])) {
  default:
    $(100);
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = delete arg[$(`y`)]);
  if (true) {
    $(100);
  } else {
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpSwitchDisc = a;
$(100);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const a = delete arg[tmpDeleteCompProp];
$(100);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 100
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
