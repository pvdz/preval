# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > regular_prop_obj > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
[$(1), 2, $(3)].a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpCompObj = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const tmpCompObj = [tmpArrElement, 2, tmpArrElement$2];
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same