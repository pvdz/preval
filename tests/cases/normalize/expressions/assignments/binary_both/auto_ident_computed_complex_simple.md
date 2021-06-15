# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)["c"]) + (a = $(b)["c"]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b)[`c`]) + (a = $(b)[`c`]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpBinBothLhs = a;
const tmpAssignRhsProp$1 = $(b);
a = tmpAssignRhsProp$1.c;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const tmpClusterSSA_a = tmpAssignRhsProp.c;
const tmpAssignRhsProp$1 = $(b);
const tmpClusterSSA_a$1 = tmpAssignRhsProp$1.c;
const tmpCalleeParam = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: { c: '1' }
 - 3: 2
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
