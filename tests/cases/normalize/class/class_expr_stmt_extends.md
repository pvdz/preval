# Preval test case

# class_expr_stmt_extends.md

> normalize > class > class_expr_stmt_extends
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

#TODO

## Input

`````js filename=intro
(class x extends $(Number) {});
`````

## Normalized

`````js filename=intro
const tmpClassSuper = $(Number);
undefined;
`````

## Output

`````js filename=intro
$(Number);
undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
