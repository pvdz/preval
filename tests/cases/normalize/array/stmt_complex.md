# Preval test case

# stmt_complex.md

> Normalize > Array > Stmt complex
>
> Array statements should be eliminated

#TODO

## Input

`````js filename=intro
[$(1), 2, $(3)];
`````

## Pre Normal

`````js filename=intro
[$(1), 2, $(3)];
`````

## Normalized

`````js filename=intro
$(1);
$(3);
`````

## Output

`````js filename=intro
$(1);
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
