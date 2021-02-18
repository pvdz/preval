# Preval test case

# class_expr_stmt_anon.md

> normalize > class > class_expr_stmt_anon
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

#TODO

## Input

`````js filename=intro
(class {});
`````

## Normalized

`````js filename=intro
undefined;
`````

## Output

`````js filename=intro
undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
