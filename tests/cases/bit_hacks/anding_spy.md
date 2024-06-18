# Preval test case

# anding_spy.md

> Bit hacks > Anding spy
>
> Two ands can be combined

## Input

`````js filename=intro
const x = $spy(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
const x = $spy(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````

## Normalized


`````js filename=intro
const x = $spy(1234);
const y = x & 200;
const z = y & 300;
$(x, y, z);
`````

## Output


`````js filename=intro
const x = $spy(1234);
const y = x & 200;
const z = y & 8;
$(x, y, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 1234 );
const b = a & 200;
const c = b & 8;
$( a, b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1234, 1234]
 - 2: '$spy[1].valueOf()', 1234
 - 3: '<spy[1]>', 192, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
