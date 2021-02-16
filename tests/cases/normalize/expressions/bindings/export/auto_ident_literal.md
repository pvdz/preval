# Preval test case

# auto_ident_literal.md

> normalize > expressions > bindings > export > auto_ident_literal
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = "foo";
$(a);
`````

## Normalized

`````js filename=intro
let a = 'foo';
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = 'foo';
export { a };
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
