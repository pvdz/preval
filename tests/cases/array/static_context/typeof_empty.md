# Preval test case

# typeof_empty.md

> Array > Static context > Typeof empty
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(typeof [0]);
`````

## Pre Normal


`````js filename=intro
$(typeof [0]);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = [0];
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`object`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "object" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
