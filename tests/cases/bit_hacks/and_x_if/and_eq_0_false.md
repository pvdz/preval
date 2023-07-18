# Preval test case

# and_eq_0_false.md

> Bit hacks > And x if > And eq 0 false
>
> Meh

#TODO

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 0; // false
$(z);
`````

## Pre Normal

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 0;
$(z);
`````

## Normalized

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 0;
$(z);
`````

## Output

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = !y;
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
