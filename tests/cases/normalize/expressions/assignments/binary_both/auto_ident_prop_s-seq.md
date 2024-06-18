# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c) + (a = (1, 2, b).c));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c) + (a = (1, 2, b).c));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsProp = b;
a = tmpAssignRhsProp.c;
let tmpBinBothLhs = a;
const tmpAssignRhsProp$1 = b;
a = tmpAssignRhsProp$1.c;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(2);
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
