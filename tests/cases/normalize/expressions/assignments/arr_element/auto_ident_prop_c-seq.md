# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c) + (a = (1, 2, $(b)).c));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c) + (a = (1, 2, $(b)).c));
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
let tmpSSA_a = tmpAssignRhsProp.c;
const tmpBinBothLhs = tmpSSA_a;
const tmpAssignRhsProp$1 = $(b);
tmpSSA_a = tmpAssignRhsProp$1.c;
const tmpCalleeParam = tmpBinBothLhs + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
let c = b.c;
const d = c;
const e = $( a );
c = e.c;
const f = d + c;
$( f );
$( c, a );
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
