# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > bindings > export > auto_ident_unary_typeof_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

export let a = typeof arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = typeof arg;
export { a };
$(a, arg);
`````

## Output

`````js filename=intro
const a = 'number';
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
