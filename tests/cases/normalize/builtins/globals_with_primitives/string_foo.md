# Preval test case

# string_foo.md

> Normalize > Builtins > Globals with primitives > String foo
>
> Calling String on a primitive should resolve

#TODO

## Input

`````js filename=intro
$(String("foo"));
`````

## Pre Normal

`````js filename=intro
$(String(`foo`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String(`foo`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = String(`foo`);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
