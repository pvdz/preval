# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b).c) + $(100));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b).c) + $(100));
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
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const tmpClusterSSA_a = tmpAssignRhsProp.c;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpClusterSSA_a + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = $( 100 );
const e = c + d;
$( e );
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 100
 - 3: 101
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
