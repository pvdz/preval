# Preval test case

# parsefloat_foo.md

> Normalize > Builtins > Globals with primitives > Parsefloat foo
>
> Calling parseFloat on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseFloat("foo"));
`````

## Pre Normal

`````js filename=intro
$(parseFloat(`foo`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = parseFloat(`foo`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = parseFloat(`foo`);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same