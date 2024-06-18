# Preval test case

# and_twice_bad.md

> Bit hacks > And twice bad
>
> Silly case that might happen in the IR

## Input

`````js filename=intro
const x = $(100) & 32;
$(x);
const y = x & 4; // Must be zero
$(y);
`````

## Pre Normal


`````js filename=intro
const x = $(100) & 32;
$(x);
const y = x & 4;
$(y);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $(100);
const x = tmpBinLhs & 32;
$(x);
const y = x & 4;
$(y);
`````

## Output


`````js filename=intro
const tmpBinLhs = $(100);
const x = tmpBinLhs & 32;
$(x);
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = a & 32;
$( b );
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 32
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
