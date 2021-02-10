# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > bindings > export > auto_ident_upd_pi_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = ++b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
