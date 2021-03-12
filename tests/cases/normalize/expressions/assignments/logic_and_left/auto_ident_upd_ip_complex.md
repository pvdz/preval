# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $($(b)).x++) && $(100));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $($(b)).x++) && $(100));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = tmpPostUpdArgVal;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpCalleeParam = tmpPostUpdArgVal;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(tmpPostUpdArgVal, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: 100
 - 5: 1, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
