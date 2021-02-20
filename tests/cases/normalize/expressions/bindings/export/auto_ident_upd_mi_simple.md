# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident upd mi simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = --b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
b = b - 1;
let a = b;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const a = 0;
export { a };
$(0, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
