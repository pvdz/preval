# Preval test case

# stmt_spread_complex.md

> Normalize > Array > Stmt spread complex
>
> Array statements should be eliminated

## Input

`````js filename=intro
[...[$(1), 2], $(3), ...$([4, 5])];
`````

## Pre Normal


`````js filename=intro
[...[$(1), 2], $(3), ...$([4, 5])];
`````

## Normalized


`````js filename=intro
$(1);
$(3);
const tmpCallCallee = $;
const tmpCalleeParam = [4, 5];
const tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
[...tmpArrElToSpread];
`````

## Output


`````js filename=intro
$(1);
$(3);
const tmpCalleeParam /*:array*/ = [4, 5];
const tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
[...tmpArrElToSpread];
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = [ 4, 5 ];
const b = $( a );
[ ...b ];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
