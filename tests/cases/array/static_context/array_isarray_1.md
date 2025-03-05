# Preval test case

# array_isarray_1.md

> Array > Static context > Array isarray 1
>
> Array.isArray does not care about the contents

## Input

`````js filename=intro
$(Array.isArray([1]));
`````

## Pre Normal


`````js filename=intro
$(Array.isArray([1]));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [1];
const tmpCalleeParam = $Array_isArray(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
