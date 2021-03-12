# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: 1, y: 2, z: 3 };
    $(a);
}
`````

## Normalized

`````js filename=intro
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = { x: 1, y: 2, z: 3 };
  $(a);
}
`````

## Output

`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
