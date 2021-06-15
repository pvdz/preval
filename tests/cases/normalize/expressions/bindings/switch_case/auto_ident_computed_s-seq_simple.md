# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = (1, 2, b)[$("c")];
    $(a, b);
}
`````

## Pre Normal

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { c: 1 };
      a = (1, 2, b)[$(`c`)];
      $(a, b);
    }
  }
}
`````

## Normalized

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { c: 1 };
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  $(a, b);
} else {
}
`````

## Output

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const tmpClusterSSA_b = { c: 1 };
const tmpClusterSSA_a = tmpClusterSSA_b[tmpAssignRhsCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
