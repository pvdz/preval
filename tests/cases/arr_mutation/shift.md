# Preval test case

# shift.md

> Arr mutation > Shift
>
> Serializing an array with elided positions

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.shift());
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr.shift());
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCallCallee = $;
const tmpCalleeParam = arr.shift();
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
