# Preval test case

# and_eq_0_true.md

> Bit hacks > And x if > And eq 0 true
>
> Meh

## Input

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y === 0; // true
$(z);
`````

## Pre Normal


`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y === 0;
$(z);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = y === 0;
$(z);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const x /*:number*/ = +tmpUnaryArg;
const y /*:number*/ = x & 32768;
const z /*:boolean*/ = !y;
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = +a;
const c = b & 32768;
const d = !c;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
