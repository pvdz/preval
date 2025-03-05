# Preval test case

# typeof_unknown.md

> Array > Static context > Typeof unknown
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(typeof [$]);
`````

## Pre Normal


`````js filename=intro
$(typeof [$]);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = [$];
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
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
