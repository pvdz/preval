# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_delete_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(delete ($(1), $(2), x).y)["a"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
$(1);
$(2);
const tmpDeleteObj = x;
const tmpCompObj = delete tmpDeleteObj.y;
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
({});
$(1);
$(2);
const tmpDeleteObj = x;
const tmpCompObj = delete tmpDeleteObj.y;
tmpCompObj.a;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
