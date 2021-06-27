# Preval test case

# array_isarray_empty.md

> Array > Static context > Array isarray empty
>
> Array.isArray does not care about the contents

#TODO

## Input

`````js filename=intro
$(Array.isArray([]));
`````

## Pre Normal

`````js filename=intro
$(Array.isArray([]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = [];
const tmpCalleeParam = Array.isArray(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
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
