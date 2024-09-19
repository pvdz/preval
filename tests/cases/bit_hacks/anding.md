# Preval test case

# anding.md

> Bit hacks > Anding
>
> Two ands can be combined

## Input

`````js filename=intro
const x = $(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
const x = $(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````

## Normalized


`````js filename=intro
const x = $(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````

## Output


`````js filename=intro
const x = $(1234);
const y /*:number*/ = x & 200;
const z /*:number*/ = y & 8;
$(x, y, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a & 200;
const c = b & 8;
$( a, b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1234
 - 2: 1234, 192, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
