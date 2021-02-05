# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > assignments > if > auto_ident_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
if ((a = (1, 2, b)[$("c")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
1;
2;
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
tmpIfTest;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
