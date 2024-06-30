# Preval test case

# base.md

> Array reads > Base
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr[0]);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCallCallee = $;
const tmpCalleeParam = arr[0];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
