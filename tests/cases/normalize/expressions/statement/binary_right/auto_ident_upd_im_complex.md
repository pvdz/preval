# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident upd im complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) + $($(b)).x--;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(100) + $($(b)).x--;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpBinBothRhs = tmpPostUpdArgVal;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
tmpBinBothLhs + tmpPostUpdArgVal;
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( 100 );
const d = $( a );
const e = $( d );
const f = e.x;
const g = f - 1;
e.x = g;
c + f;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
