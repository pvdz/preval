# Preval test case

# stmt_undefined.md

> Normalize > Identifier > Stmt undefined
>
> Builtin global statement should be eliminated

#TODO

## Input

`````js filename=intro
undefined;
`````

## Pre Normal

`````js filename=intro
undefined;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
