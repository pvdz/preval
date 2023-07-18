# Preval test case

# array_length.md

> Normalize > Static expressions > Statement > Array length
>
> The length property on an array literal can be determined at compile time

#TODO

## Input

`````js filename=intro
$([10, 20, 30].length);
`````

## Pre Normal

`````js filename=intro
$([10, 20, 30].length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 3;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
