# Preval test case

# prop_write_unknown.md

> Array > Static props > Prop write unknown
>
> Getting the length of an array can be tricky, and sometimes be done

We can't tell what happened to the array so we must bail on the inlining.

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[$(2)] = 10;
$(arr.length);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
arr[$(2)] = 10;
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpAssignComMemLhsObj = arr;
const tmpAssignComMemLhsProp = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 10;
const tmpCallCallee = $;
const tmpCalleeParam = arr.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpAssignComMemLhsProp = $(2);
const arr = [1, 2, 3];
arr[tmpAssignComMemLhsProp] = 10;
const tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ 1, 2, 3 ];
b[a] = 10;
const c = b.length;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
