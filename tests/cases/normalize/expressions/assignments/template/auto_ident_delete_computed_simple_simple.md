# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = delete arg["y"])}  after`);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpFree /*:(boolean)=>string*/ = function $free($$0) {
  const a$1 /*:boolean*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(a$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, a);
$(tmpCalleeParam);
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(a$1) {
  const tmpRet = `before  ${a$1}  after`;
  return tmpRet;
};
const arg = { y: 1 };
const a = delete arg.y;
$($frfr(tmpFree, a));
$(a, arg);
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
$( g, f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before true after'
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
