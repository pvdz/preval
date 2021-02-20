# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Bindings > Export > Auto ident ident ident
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
const a = 2;
export { a };
$(2, 2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
