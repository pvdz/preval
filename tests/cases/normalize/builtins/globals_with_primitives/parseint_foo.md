# Preval test case

# parseint_foo.md

> Normalize > Builtins > Globals with primitives > Parseint foo
>
> Calling parseInt on a primitive should resolve

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
const tmpCalleeParam = NaN;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
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
