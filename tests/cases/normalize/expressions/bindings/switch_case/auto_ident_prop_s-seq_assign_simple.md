# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident prop s-seq assign simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = ((1, 2, b).c = 2);
    $(a, b);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { c: 1 };
    a = (1, 2, b).c = 2;
    $(a, b);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = { c: 1 };
  const tmpNestedAssignObj = b;
  const tmpNestedPropAssignRhs = 2;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b);
} else {
}
`````

## Output

`````js filename=intro
const tmpClusterSSA_b = { c: 1 };
tmpClusterSSA_b.c = 2;
$(2, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
