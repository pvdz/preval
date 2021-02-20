# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = (1, 2, b)[$("c")];
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
const b = { c: 1 };
const tmpCompProp = $('c');
const a = b[tmpCompProp];
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
