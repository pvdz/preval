# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = typeof x)];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
a = 'number';
tmpCompProp = 'number';
tmpCompObj[tmpCompProp];
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
