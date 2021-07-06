# Preval test case

# stmt_no_expr.md

> Normalize > Expressions > Assignments > Template > Stmt no expr
>
> A template that is a statement should be eliminated

#TODO

## Input

`````js filename=intro
`foo`;
`````

## Pre Normal

`````js filename=intro
`foo`;
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
