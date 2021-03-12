# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(b)).x--)}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(b)).x--)}  after`);
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
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = tmpPostUpdArgVal;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
const tmpCalleeParam = `before  ${tmpPostUpdArgVal}  after`;
$(tmpCalleeParam);
$(tmpPostUpdArgVal, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 1 after'
 - 4: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
