# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete prop simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete arg.y;
    $(a, arg);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let arg;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    arg = { y: 1 };
    a = delete arg.y;
    $(a, arg);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let arg = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  arg = { y: 1 };
  a = delete arg.y;
  $(a, arg);
} else {
}
`````

## Output


`````js filename=intro
const tmpClusterSSA_arg = { y: 1 };
const tmpClusterSSA_a = delete tmpClusterSSA_arg.y;
$(tmpClusterSSA_a, tmpClusterSSA_arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = deletea.y;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
