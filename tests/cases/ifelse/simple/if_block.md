# Preval test case

# if_block.md

> Ifelse > Simple > If block
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (1) {}
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
