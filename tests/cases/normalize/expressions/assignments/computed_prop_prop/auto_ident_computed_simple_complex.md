# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b[$("c")])];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $('c');
const tmpNestedComplexRhs = tmpCompObj$1[tmpCompProp$1];
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $('c');
const tmpNestedComplexRhs = tmpCompObj$1[tmpCompProp$1];
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
