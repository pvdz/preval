# Preval test case

# auto_ident_call_prop_c-seq.md

> normalize > expressions > bindings > export > auto_ident_call_prop_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = (1, 2, $(b)).$(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCallObj = $(b);
let a = tmpCallObj.$(1);
export { a };
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
const tmpCallObj = $(b);
let a = tmpCallObj.$(1);
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same