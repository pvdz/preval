# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > bindings > export > auto_ident_call_complex_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = $($)($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
