# Preval test case

# base.md

> Array > Static props > Base
>
> Getting the length of an array can be tricky, and sometimes be done

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.length);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
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
