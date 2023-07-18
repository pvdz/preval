# Preval test case

# array_isarray_123.md

> Array > Static context > Array isarray 123
>
> Array.isArray does not care about the contents

#TODO

## Input

`````js filename=intro
$(Array.isArray([1,2,3]));
`````

## Pre Normal

`````js filename=intro
$(Array.isArray([1, 2, 3]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam = Array.isArray(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
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
