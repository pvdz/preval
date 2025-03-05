# Preval test case

# call_arg_simple.md

> Normalize > Spread > Call arg simple
>
> Spread should normalize itself

## Input

`````js filename=intro
$(...[1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
$(...[1, 2, 3]);
`````

## Normalized


`````js filename=intro
const tmpCalleeParamSpread = [1, 2, 3];
$(...tmpCalleeParamSpread);
`````

## Output


`````js filename=intro
$(1, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
