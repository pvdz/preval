# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary plus simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

export let a = +arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = +arg;
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
const a = 1;
export { a };
$(+1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
