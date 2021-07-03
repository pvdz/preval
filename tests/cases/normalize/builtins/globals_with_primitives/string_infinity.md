# Preval test case

# string_infinity.md

> Normalize > Builtins > Globals with primitives > String infinity
>
> Calling String on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(String(Infinity));
`````

## Pre Normal

`````js filename=intro
$(String(Infinity));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = Infinity;
const tmpCalleeParam = $coerce(tmpStringFirstArg, `string`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`Infinity`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
