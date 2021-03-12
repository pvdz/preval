# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident logic or simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 0 || 2;
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
  a = 0;
  if (a) {
  } else {
    a = 2;
  }
  $(a);
}
`````

## Output

`````js filename=intro
let SSA_a = 0;
if (SSA_a) {
} else {
  SSA_a = 2;
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
