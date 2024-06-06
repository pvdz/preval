# Preval test case

# number_eq_one_one.md

> Typed comparison > Number eq one one
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = String($(1));
const y = x === 1;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = String($(1));
const y = x === 1;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(1);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === 1;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpStringFirstArg = $(1);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, false);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$coerce( a, "string" );
$( "out:", false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
