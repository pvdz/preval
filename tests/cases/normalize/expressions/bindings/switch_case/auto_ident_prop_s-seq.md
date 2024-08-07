# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = (1, 2, b).c;
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
    a = (1, 2, b).c;
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
  const tmpAssignRhsProp = b;
  a = tmpAssignRhsProp.c;
  $(a, b);
} else {
}
`````

## Output


`````js filename=intro
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
