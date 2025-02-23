# Preval test case

# string_eq_bool.md

> Typed comparison > String eq bool
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = String($("foo"));
const y = x === true;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = String($(`foo`));
const y = x === true;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $(`foo`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x === true;
$(`out:`, y);
`````

## Output


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $(`foo`);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, false);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
$coerce( a, "string" );
$( "out:", false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
