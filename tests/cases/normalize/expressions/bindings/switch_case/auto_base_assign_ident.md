# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > switch_case > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = (b = $(2));
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = 1;
  b = $(2);
  a = b;
  $(a, b);
}
`````

## Output

`````js filename=intro
const SSA_b$1 = $(2);
$(SSA_b$1, SSA_b$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
