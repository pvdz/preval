# Preval test case

# escape.md

> Array > Static props > Escape
>
> Getting the length of an array can be tricky, and sometimes be done

Since anything can happen to an array when it escapes into a black hole, we must consider the array dirty.

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr); // "escaped"
$(arr.length);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr);
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
$(arr);
const tmpCallCallee = $;
const tmpCalleeParam = arr.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const arr = [1, 2, 3];
$(arr);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
