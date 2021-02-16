# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > bindings > export > auto_ident_unary_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

export let a = typeof x;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = typeof x;
export { a };
$(a, x);
`````

## Output

`````js filename=intro
let a = 'number';
export { a };
$('number', 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
