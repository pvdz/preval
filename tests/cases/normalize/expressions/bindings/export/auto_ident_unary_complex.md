# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

export let a = typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpUnaryArg = $(x);
let a = typeof tmpUnaryArg;
export { a };
$(a, x);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
export { a };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
