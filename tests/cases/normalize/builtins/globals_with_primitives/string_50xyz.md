# Preval test case

# string_50xyz.md

> Normalize > Builtins > Globals with primitives > String 50xyz
>
> Calling String on a primitive should resolve

This is different from `parseInt`...

## Input

`````js filename=intro
$(String("50xyz"));
`````

## Pre Normal


`````js filename=intro
$(String(`50xyz`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `50xyz`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`50xyz`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "50xyz" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
