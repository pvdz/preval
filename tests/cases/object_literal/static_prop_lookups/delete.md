# Preval test case

# delete.md

> Object literal > Static prop lookups > Delete
>
> When the prop is an argument to `delet` it is not a read and we should skip

#TODO

## Input

`````js filename=intro
const obj = {x: 1};
delete obj.x;
$(obj);
`````

## Pre Normal


`````js filename=intro
const obj = { x: 1 };
delete obj.x;
$(obj);
`````

## Normalized


`````js filename=intro
const obj = { x: 1 };
delete obj.x;
$(obj);
`````

## Output


`````js filename=intro
const obj = { x: 1 };
delete obj.x;
$(obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
deletea.x;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
