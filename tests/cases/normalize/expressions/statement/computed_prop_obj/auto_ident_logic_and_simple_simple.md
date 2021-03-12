# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 && 2)["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 && 2)['a'];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = 1;
if (tmpCompObj) {
  tmpCompObj = 2;
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpCompObj = 1;
if (tmpCompObj) {
  tmpCompObj = 2;
}
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
