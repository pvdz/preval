# Preval test case

# class_expr_stmt_id.md

> Normalize > Class > Class expr stmt id
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

#TODO

## Input

`````js filename=intro
(class x {});
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