# Preval test case

# bitset.md

> Bit hacks > Bitset
>
> Testing if one specific bit is set

## Input

`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Normalized


`````js filename=intro
const x = $(1234);
const y = x & 2;
const z = y === 2;
$(x, y, z);
`````

## Output


`````js filename=intro
const x = $(1234);
const y /*:number*/ = x & 2;
const z /*:boolean*/ = Boolean(y);
$(x, y, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a & 2;
const c = Boolean( b );
$( a, b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1234
 - 2: 1234, 2, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
