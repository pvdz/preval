# Preval test case

# auto_ident_func_id.md

> normalize > expressions > bindings > export > auto_ident_func_id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = function f() {};
$(a);
`````

## Normalized

`````js filename=intro
let a = function f() {};
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = function f() {};
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
