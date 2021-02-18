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
b = $(2);
let a = b;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const SSA_b = $(2);
const a = SSA_b;
export { a };
$(SSA_b, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
