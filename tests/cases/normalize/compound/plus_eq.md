# Preval test case

# plus_eq.md

> Normalize > Compound > Plus eq
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

## Input

`````js filename=intro
let a = $(1);
a += $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $(1);
a += $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = $(1);
const tmpBinBothLhs = a;
const tmpBinBothRhs = $(2);
a = tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:primitive*/ = a + tmpBinBothRhs;
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
