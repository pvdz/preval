# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Bindings > Switch case > Auto ident nested simple member assigns
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = 3;

    let a = (b.x = b.x = b.x = b.x = b.x = b.x = c);
    $(a, b, c);
}
`````

## Pre Normal

`````js filename=intro
{
  let b;
  let c;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      (b = { x: 1 }), (c = 3);
      a = b.x = b.x = b.x = b.x = b.x = b.x = c;
      $(a, b, c);
    }
  }
}
`````

## Normalized

`````js filename=intro
let b = undefined;
let c = undefined;
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
  b = { x: 1 };
  c = 3;
  const varInitAssignLhsComputedRhs$7 = c;
  b.x = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
  b.x = varInitAssignLhsComputedRhs$5;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
  b.x = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b, c);
} else {
}
`````

## Output

`````js filename=intro
const tmpClusterSSA_b = { x: 1 };
tmpClusterSSA_b.x = 3;
tmpClusterSSA_b.x = 3;
tmpClusterSSA_b.x = 3;
tmpClusterSSA_b.x = 3;
tmpClusterSSA_b.x = 3;
tmpClusterSSA_b.x = 3;
$(3, tmpClusterSSA_b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
