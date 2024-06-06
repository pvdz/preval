# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $(b)["c"];
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = $(b)[`c`];
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
$(a, b);
`````

## Output


`````js filename=intro
$(1);
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const tmpClusterSSA_a = tmpAssignRhsProp.c;
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
