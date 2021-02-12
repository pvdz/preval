# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > stmt_global_top > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = (b = $(2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
