# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Template > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = delete ($(1), $(2), $(arg)).y)}  after`);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpFree /*:(boolean)=>string*/ = function $free($$0) {
  const a$1 /*:boolean*/ = $$0;
  debugger;
  const tmpStringConcatL /*:string*/ = $coerce(a$1, `string`);
  const tmpRet /*:string*/ /*truthy*/ = `before  ${tmpStringConcatL}  after`;
  return tmpRet;
};
$(1);
$(2);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const a /*:boolean*/ = delete tmpDeleteObj.y;
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
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const a = delete tmpDeleteObj.y;
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
$( 1 );
$( 2 );
const f = { y: 1 };
const g = $( f );
const h = delete g.y;
const i = j( a, h );
$( i );
$( h, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'before true after'
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
