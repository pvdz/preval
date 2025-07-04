# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Binary left > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(function f() {} + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpBinBothRhs /*:unknown*/ = $(100);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(function $pcompiled() {} + $(100));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
const c = $( 100 );
a + c;
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
const tmpBinBothLhs = f;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
