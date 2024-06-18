# Preval test case

# and_eq_coercion.md

> Bit hacks > And x if > And eq coercion
>
> Meh

## Input

`````js filename=intro
const x = $('32768');
const y = x & 32768; // (coercion)
const z = y === 32768 // true
$(z);
`````

## Pre Normal


`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Normalized


`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Output


`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = Boolean(y);
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "32768" );
const b = a & 32768;
const c = Boolean( b );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '32768'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
