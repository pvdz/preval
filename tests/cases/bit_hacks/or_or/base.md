# Preval test case

# base.md

> Bit hacks > Or or > Base
>
> If a value is orred to two primitives, you can at least safely merge those primitive.

## Input

`````js filename=intro
const a = $(0);
const b = a | 16;
const c = b | 32;
$(c);
`````

## Pre Normal


`````js filename=intro
const a = $(0);
const b = a | 16;
const c = b | 32;
$(c);
`````

## Normalized


`````js filename=intro
const a = $(0);
const b = a | 16;
const c = b | 32;
$(c);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:number*/ = a | 48;
$(b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = a | 48;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 48
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
