# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident new prop complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = new ($(b).$)(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
