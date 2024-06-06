# Preval test case

# and_eq_n_true.md

> Bit hacks > And x if > And eq n true
>
> Meh

#TODO

## Input

`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y === 32768; // false
$(z);
`````

## Pre Normal


`````js filename=intro
const x = +$(1);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const x = +tmpUnaryArg;
const y = x & 32768;
const z = Boolean(y);
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = +a;
const c = b & 32768;
const d = Boolean( c );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
