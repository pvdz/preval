# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[($(1), $(2), $(x))];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
$(1);
$(2);
const tmpCompProp = $(x);
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
$(1);
$(2);
const tmpCompProp = $(1);
obj[tmpCompProp];
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
