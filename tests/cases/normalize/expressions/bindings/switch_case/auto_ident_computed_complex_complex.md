# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = $(b)[$("c")];
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
    a = $(b)[$(`c`)];
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
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  $(a, b);
} else {
}
`````

## Output

`````js filename=intro
const tmpClusterSSA_b = { c: 1 };
const tmpAssignRhsCompObj = $(tmpClusterSSA_b);
const tmpAssignRhsCompProp = $(`c`);
const tmpClusterSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
