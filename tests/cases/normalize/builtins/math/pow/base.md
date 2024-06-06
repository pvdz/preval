# Preval test case

# base.md

> Normalize > Builtins > Math > Pow > Base
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow(3, 8));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(3, 8));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 6561;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(6561);
`````

## PST Output

With rename=true

`````js filename=intro
$( 6561 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6561
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
