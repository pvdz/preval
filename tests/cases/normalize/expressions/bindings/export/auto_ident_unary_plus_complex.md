# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary plus complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = +$(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = +$(100);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(100);
let a = +tmpUnaryArg;
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = +tmpUnaryArg;
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
