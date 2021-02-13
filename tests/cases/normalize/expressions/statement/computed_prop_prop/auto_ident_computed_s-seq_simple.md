# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(1, 2, b)[$("c")]];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $('c');
const tmpCompProp = tmpCompObj$1[tmpCompProp$1];
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $('c');
const tmpCompProp = tmpCompObj$1[tmpCompProp$1];
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same