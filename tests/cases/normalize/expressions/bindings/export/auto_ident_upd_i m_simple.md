# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > bindings > export > auto_ident_upd_i m_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = b--;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
const tmpPostUpdArgIdent = b;
b = b - 1;
let a = tmpPostUpdArgIdent;
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
