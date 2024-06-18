# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Binary left > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c) + $(100));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c) + $(100));
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
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam = 1 + tmpBinBothRhs;
$(tmpCalleeParam);
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = 1 + a;
$( b );
const c = { c: 1 };
$( 1, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 101
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
