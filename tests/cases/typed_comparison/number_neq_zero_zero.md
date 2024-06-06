# Preval test case

# number_neq_zero_zero.md

> Typed comparison > Number neq zero zero
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = String($(0));
const y = x !== 0;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = String($(0));
const y = x !== 0;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(0);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== 0;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpStringFirstArg = $(0);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
$coerce( a, "string" );
$( "out:", true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
