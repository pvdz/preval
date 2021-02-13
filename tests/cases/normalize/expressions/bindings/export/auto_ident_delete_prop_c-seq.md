# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > bindings > export > auto_ident_delete_prop_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete ($(1), $(2), $(arg)).y;
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
export { a };
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
export { a };
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same