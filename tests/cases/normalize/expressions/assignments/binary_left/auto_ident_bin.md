# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Binary left > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) + $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs$1 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
const d = $( 100 );
const e = c + d;
$( e );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 103
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
