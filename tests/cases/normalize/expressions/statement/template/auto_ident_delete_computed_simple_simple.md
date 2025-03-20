# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Statement > Template > Auto ident delete computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${delete arg["y"]}  after`);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpFree /*:(boolean)=>string*/ = function $free($$0) {
  const tmpCalleeParam$2 /*:boolean*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$2, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const arg /*:object*/ = { y: 1 };
const tmpCalleeParam$1 /*:boolean*/ = delete arg.y;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpCalleeParam$1);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpCalleeParam$2) {
  const tmpRet = `before  ${tmpCalleeParam$2}  after`;
  return tmpRet;
};
const arg = { y: 1 };
$($frfr(tmpFree, delete arg.y));
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  return e;
};
const f = { y: 1 };
const g = delete f.y;
const h = i( a, g );
$( h );
const j = {
  a: 999,
  b: 1000,
};
$( j, f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before true after'
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
