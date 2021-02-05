# Preval test case

# auto_ident_ident.md

> normalize > expressions > bindings > export > auto_ident_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = b;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
export { a };
$(1, 1);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
