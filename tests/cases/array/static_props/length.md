# Preval test case

# length.md

> Array > Static props > Length
>
> The immediate access should be resolved because we can guarantee the value

## Input

`````js filename=intro
const arr = [1, $, 3];
$(arr.length);
`````

## Pre Normal


`````js filename=intro
const arr = [1, $, 3];
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, $, 3];
const tmpCallCallee = $;
const tmpCalleeParam = arr.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
