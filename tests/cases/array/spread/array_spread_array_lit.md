# Preval test case

# array_spread_array_lit.md

> Array > Spread > Array spread array lit
>
> Array containing a spread of an array literal

This should be handled by normalization even.

#TODO

## Input

`````js filename=intro
$([...[1]])
`````

## Pre Normal

`````js filename=intro
$([...[1]]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [1];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [1];
$(tmpCalleeParam);
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