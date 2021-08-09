# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Bindings > Switch case > Auto ident object empty
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = {};
    $(a);
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = {};
    $(a);
  } else {
  }
}
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  a = {};
  $(a);
} else {
}
`````

## Output

`````js filename=intro
const tmpClusterSSA_a = {};
$(tmpClusterSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
