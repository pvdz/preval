# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary void simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

export let a = void arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = undefined;
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
const a = undefined;
export { a };
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
