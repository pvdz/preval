# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_unary_tilde_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[~x];
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompProp = ~x;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompProp = ~x;
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
