# Preval test case

# auto_ident_upd_im_complex.md

> normalize > expressions > statement > logic_and_both > auto_ident_upd_im_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(b)).x-- && $($(b)).x--;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpIfTest = tmpPostUpdArgVal;
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj$1 = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj$1;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
if (tmpPostUpdArgVal) {
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
  tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '0' }
 - 4: { x: '0' }
 - 5: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
