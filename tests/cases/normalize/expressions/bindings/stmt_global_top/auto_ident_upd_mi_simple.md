# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_upd_mi_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = --b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
