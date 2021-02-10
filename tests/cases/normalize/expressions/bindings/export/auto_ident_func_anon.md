# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > bindings > export > auto_ident_func_anon
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = function () {};
$(a);
`````

## Normalized

`````js filename=intro
let a = function () {};
export { a };
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
