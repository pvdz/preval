# Preval test case

# stmt_no_id.md

> Normalize > Function > Expr > Stmt no id
>
> A function expression that is a statement should be dropped.

#TODO

## Input

`````js filename=intro
(function(){});
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
