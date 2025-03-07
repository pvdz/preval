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

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:number*/ = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
tmpBinBothLhs + tmpPostUpdArgVal;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { x: 1 };
const tmpPostUpdArgObj = $($(b));
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
tmpPostUpdArgObj.x = tmpPostUpdArgVal - 1;
tmpBinBothLhs + tmpPostUpdArgVal;
$({ a: 999, b: 1000 }, b);
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
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpBinBothRhs = tmpPostUpdArgVal;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = $( b );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
a + e;
const g = {
  a: 999,
  b: 1000,
};
$( g, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
