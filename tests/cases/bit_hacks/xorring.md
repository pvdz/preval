# Preval test case

# xorring.md

> Bit hacks > Xorring
>
> Two xors back to back

## Input

`````js filename=intro
const x = $(1234);
const y = x ^ 200;
const z = y ^ 300;
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
const x = $(1234);
const y = x ^ 200;
const z = y ^ 300;
$(x, y, z);
`````

## Normalized


`````js filename=intro
const x = $(1234);
const y = x ^ 200;
const z = y ^ 300;
$(x, y, z);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1234);
const y /*:number*/ = x ^ 200;
const z /*:number*/ = y ^ 300;
$(x, y, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1234 );
const b = a ^ 200;
const c = b ^ 300;
$( a, b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1234
 - 2: 1234, 1050, 1334
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
