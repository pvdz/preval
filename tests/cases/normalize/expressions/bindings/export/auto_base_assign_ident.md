# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > export > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = (b = $(2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
export { a };
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
