# Preval test case

# array_array.md

> Normalize > Spread > Array array
>
> Spreading an array literal can be resolved statically

#TODO

## Input

`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Pre Normal

`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## Output

`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4,, ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
