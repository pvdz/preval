# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > bindings > export > auto_ident_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = $(b)[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $('c');
let a = tmpCompObj[tmpCompProp];
export { a };
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
