# Preval test case

# number_eq_zero_zero.md

> Typed comparison > Number eq zero zero
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($(0));
const y = x === 0;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = String($(0));
const y = x === 0;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(0);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === 0;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(0);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, false);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
$coerce( a, "string" );
$( "out:", false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
