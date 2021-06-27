# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $($)(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $($)(1);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallComplexCallee = $($);
let a = tmpCallComplexCallee(1);
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpCallComplexCallee = $($);
const a = tmpCallComplexCallee(1);
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
