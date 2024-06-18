# Preval test case

# parseint_50xyz.md

> Normalize > Builtins > Globals with primitives > Parseint 50xyz
>
> Calling parseInt on a primitive should resolve

## Input

`````js filename=intro
$(parseInt("50xyz"));
`````

## Pre Normal


`````js filename=intro
$(parseInt(`50xyz`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 50;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(50);
`````

## PST Output

With rename=true

`````js filename=intro
$( 50 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
