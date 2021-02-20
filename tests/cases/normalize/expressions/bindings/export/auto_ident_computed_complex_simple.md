# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident computed complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = $(b)["c"];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
let a = tmpCompObj.c;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const a = tmpCompObj.c;
export { a };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
