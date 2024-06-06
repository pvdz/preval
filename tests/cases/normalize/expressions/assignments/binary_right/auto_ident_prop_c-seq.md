# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Binary right > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b)).c));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b)).c));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const tmpClusterSSA_a = tmpAssignRhsProp.c;
const tmpCalleeParam = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = { c: 1 };
const c = $( b );
const d = c.c;
const e = a + d;
$( e );
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 101
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
