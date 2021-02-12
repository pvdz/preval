# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > stmt_global_top > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
a = (1, 2, b).c = 2;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
a = 2;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
