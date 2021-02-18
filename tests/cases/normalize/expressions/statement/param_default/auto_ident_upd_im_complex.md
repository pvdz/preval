# Preval test case

# auto_ident_upd_im_complex.md

> normalize > expressions > statement > param_default > auto_ident_upd_im_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = $($(b)).x--) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    p = tmpPostUpdArgVal;
  } else {
    p = $tdz$__p;
  }
}
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(b);
    const tmpPostUpdArgObj = $(tmpCalleeParam);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
    tmpPostUpdArgObj.x = tmpAssignMemRhs;
  }
}
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: undefined
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
