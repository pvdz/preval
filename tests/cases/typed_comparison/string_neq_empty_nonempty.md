# Preval test case

# string_neq_empty_nonempty.md

> Typed comparison > String neq empty nonempty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = String($(''));
const y = x !== 'full';
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = String($(``));
const y = x !== `full`;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(``);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== `full`;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpStringFirstArg = $(``);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== `full`;
$(`out:`, y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "string" );
const c = b !== "full";
$( "out:", c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
