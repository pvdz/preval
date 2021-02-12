# Preval test case

# auto_ident_func_id.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_func_id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = function f() {};
$(a);
`````

## Normalized

`````js filename=intro
let a = function f() {};
$(a);
`````

## Output

`````js filename=intro
let a = function f() {};
$(a);
`````

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
