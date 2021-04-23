# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident cond simple c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 ? (40, 50, $(60)) : $($(100)))["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 ? (40, 50, $(60)) : $($(100)))['a'];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
tmpCompObj = $(60);
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCompObj = $(60);
tmpCompObj.a;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
