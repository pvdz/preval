# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident upd im complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(b)).x-- + $($(b)).x--;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(b)).x-- + $($(b)).x--;
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
const tmpBinBothLhs = tmpPostUpdArgVal;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj$1 = tmpCallCallee$1(tmpCalleeParam$1);
const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj$1;
const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
const tmpBinBothRhs = tmpPostUpdArgVal$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
tmpPostUpdArgVal + tmpPostUpdArgVal$1;
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d - 1;
c.x = e;
const f = $( a );
const g = $( f );
const h = g.x;
const i = h - 1;
g.x = i;
d + h;
const j = {
  a: 999,
  b: 1000,
};
$( j, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '0' }
 - 4: { x: '0' }
 - 5: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
