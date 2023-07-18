# Preval test case

# string_neq_bool.md

> Typed comparison > String neq bool
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = String($("foo"));
const y = x !== true;
$('out:', y);
`````

## Pre Normal

`````js filename=intro
const x = String($(`foo`));
const y = x !== true;
$(`out:`, y);
`````

## Normalized

`````js filename=intro
const tmpStringFirstArg = $(`foo`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== true;
$(`out:`, y);
`````

## Output

`````js filename=intro
const tmpStringFirstArg = $(`foo`);
$coerce(tmpStringFirstArg, `string`);
$(`out:`, true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
$coerce( a, "string" );
$( "out:", true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
