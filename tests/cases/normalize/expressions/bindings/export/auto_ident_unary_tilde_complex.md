# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > bindings > export > auto_ident_unary_tilde_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = ~$(100);
$(a);
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(100);
let a = ~tmpUnaryArg;
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
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
