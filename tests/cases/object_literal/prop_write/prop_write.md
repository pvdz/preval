# Preval test case

# prop_write.md

> Object literal > Prop write > Prop write
>
> The write should be eliminated immediately

## Input

`````js filename=intro
const b = { x: 1 };
b.x = 3;
$(b);
`````

## Pre Normal

`````js filename=intro
const b = { x: 1 };
b.x = 3;
$(b);
`````

## Normalized

`````js filename=intro
const b = { x: 1 };
b.x = 3;
$(b);
`````

## Output

`````js filename=intro
const b = { x: 3 };
$(b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
