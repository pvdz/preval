# Preval test case

# auto_ident_new_computed_simple_complex.md

> normalize > expressions > bindings > export > auto_ident_new_computed_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = new b[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
