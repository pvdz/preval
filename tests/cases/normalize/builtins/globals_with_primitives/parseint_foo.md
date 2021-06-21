# Preval test case

# parseint_foo.md

> Normalize > Builtins > Globals with primitives > Parseint foo
>
> Calling parseInt on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(parseInt("foo"));
`````

## Pre Normal

`````js filename=intro
$(parseInt(`foo`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = parseInt(`foo`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = parseInt(`foo`);
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
