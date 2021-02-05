# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > bindings > export > auto_ident_prop_s-seq_assign_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = ((1, 2, b).c = 2);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a;
1;
2;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
a = 2;
export { a };
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
