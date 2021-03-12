# Preval test case

# binary_arg.md

> Normalize > Delete > Binary arg
>
> Delete on non-property is valid but useless

#TODO

## Input

`````js filename=intro
$(delete (1 + 1));
`````

## Pre Normal

`````js filename=intro
$(delete (1 + 1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
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
