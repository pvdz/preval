# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident array empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
[]["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
[]['a'];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = [];
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCompObj = [];
tmpCompObj.a;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
