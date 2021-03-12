# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = [])];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = [])];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = [];
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
const SSA_a = [];
obj[SSA_a];
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
