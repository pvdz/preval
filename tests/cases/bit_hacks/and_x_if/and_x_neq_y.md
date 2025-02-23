# Preval test case

# and_x_neq_y.md

> Bit hacks > And x if > And x neq y
>
> Meh

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32; // Must be true since the y must be either 0 or 32768
$(z);
`````

## Pre Normal


`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32;
$(z);
`````

## Normalized


`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32;
$(z);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(32768);
x ** 0;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 32768 );
a ** 0;
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32768
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
