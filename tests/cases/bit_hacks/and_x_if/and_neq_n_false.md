# Preval test case

# and_neq_n_false.md

> Bit hacks > And x if > And neq n false
>
> Meh

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32768; // false
$(z);
`````

## Pre Normal


`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32768;
$(z);
`````

## Normalized


`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32768;
$(z);
`````

## Output


`````js filename=intro
const x = $(32768);
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = !y;
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 32768 );
const b = a & 32768;
const c = !b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32768
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
