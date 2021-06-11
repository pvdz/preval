# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident computed simple complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = b[$("c")];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = b[$('c')];
export { a };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = b;
const tmpCompProp = $('c');
let a = tmpCompObj[tmpCompProp];
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const tmpCompProp = $('c');
const b = { c: 1 };
const a = b[tmpCompProp];
export { a };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
