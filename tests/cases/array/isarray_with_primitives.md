# Preval test case

# isarray_with_primitives.md

> Array > Isarray with primitives
>
> Array.isArray check

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

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same