# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_func_anon
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = function () {};
$(a);
`````

## Normalized

`````js filename=intro
let a = function () {};
$(a);
`````

## Output

`````js filename=intro
let a = function () {};
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
