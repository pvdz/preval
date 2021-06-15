# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = delete ($(1), $(2), $(arg))[$("y")])];
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = delete ($(1), $(2), $(arg))[$(`y`)])];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const obj = {};
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
