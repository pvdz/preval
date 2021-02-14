# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > bindings > export > auto_ident_new_ident_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = new $($(1), $(2));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = new $(tmpCalleeParam, tmpCalleeParam$1);
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
