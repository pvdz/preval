# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = $($(b)).x++).a;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($(b)).x++).a;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = tmpPostUpdArgVal;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
tmpPostUpdArgVal.a;
$(tmpPostUpdArgVal, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
