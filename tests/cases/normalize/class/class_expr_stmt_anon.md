# Preval test case

# class_expr_stmt_anon.md

> Normalize > Class > Class expr stmt anon
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

#TODO

## Input

`````js filename=intro
(class {});
`````

## Pre Normal

`````js filename=intro
(class {});
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
