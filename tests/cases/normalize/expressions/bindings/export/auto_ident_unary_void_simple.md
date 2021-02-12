# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > bindings > export > auto_ident_unary_void_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

export let a = void x;
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = undefined;
export { a };
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = undefined;
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
