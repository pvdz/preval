# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete arg["y"];
    $(a, arg);
}
`````

## Normalized

`````js filename=intro
let arg;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  arg = { y: 1 };
  a = delete arg.y;
  $(a, arg);
}
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
