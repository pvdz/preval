# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > bindings > export > auto_ident_ident_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

export let a = (b = 2);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
b = 2;
let a = b;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
b = 2;
let a = b;
export { a };
$(a, b, c);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
