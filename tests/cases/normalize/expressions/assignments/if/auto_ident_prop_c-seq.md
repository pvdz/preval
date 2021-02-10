# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > assignments > if > auto_ident_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
if ((a = (1, 2, $(b)).c));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
