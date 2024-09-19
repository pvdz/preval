# Preval test case

# write_to_length.md

> Array > Write to length
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.length = 1;
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
arr.length = 1;
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
arr.length = 1;
$(arr);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
arr.length = 1;
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
a.length = 1;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
