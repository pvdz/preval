# Preval test case

# map_to_map_reg1.md

> Spread > Map to map reg1
>
> Broken spread case

This was a regression where the spread was not put back into the AST after a transforming step.

#TODO

## Input

`````js filename=intro
$([...[1]])
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

Normalized calls: Same

Final output calls: Same
