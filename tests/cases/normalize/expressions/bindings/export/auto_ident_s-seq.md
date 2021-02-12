# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > bindings > export > auto_ident_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

export let a = ($(1), $(2), x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
$(1);
$(2);
let a = x;
export { a };
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
$(1);
$(2);
let a = x;
export { a };
$(a, x);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
