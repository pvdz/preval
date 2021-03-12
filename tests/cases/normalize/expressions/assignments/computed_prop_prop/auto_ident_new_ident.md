# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new $(1))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new $(1))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = new $(1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
const SSA_a = new $(1);
obj[SSA_a];
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
