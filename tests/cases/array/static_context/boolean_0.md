# Preval test case

# boolean_0.md

> Array > Static context > Boolean 0
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(Boolean([0]));
`````

## Pre Normal


`````js filename=intro
$(Boolean([0]));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [0];
const tmpCalleeParam = Boolean(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
