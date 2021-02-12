# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > bindings > export > auto_ident_unary_void_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = void $(100);
$(a);
`````

## Normalized

`````js filename=intro
$(100);
let a = undefined;
export { a };
$(a);
`````

## Output

`````js filename=intro
$(100);
let a = undefined;
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
