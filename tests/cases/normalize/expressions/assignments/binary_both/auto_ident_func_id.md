# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Binary both > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) + (a = function f() {}));
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpClusterSSA_a /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function $pcompiled() {};
const tmpClusterSSA_a = function $pcompiled() {};
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
const b = function $pcompiled() {
  debugger;
  return undefined;
};
const c = a + b;
$( c );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
const tmpBinBothLhs = a;
const f$1 = function () {
  debugger;
  return undefined;
};
a = f$1;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function() {return undefined;}function() {return undefined;}'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
