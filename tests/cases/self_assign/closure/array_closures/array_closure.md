# Preval test case

# array_closure.md

> Self assign > Closure > Array closures > Array closure
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the array is not mutated nor reference checked, the values should be safe to access.

## Input

`````js filename=intro
// Should NOT get inlined because a AND b get called after the first call
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
var b = a;
$(a());
$(b());
// Reference check (should be different closure)
$(a() === b());
// Reference check (should be same closure)
$(a() === a());
`````


## Settled


`````js filename=intro
let a /*:()=>unknown*/ = function () {
  debugger;
  const arr /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg /*:unknown*/ = a();
  return tmpReturnArg;
};
const b /*:unknown*/ = a;
const tmpCalleeParam /*:unknown*/ = a();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = b();
$(tmpCalleeParam$1);
const tmpBinBothLhs /*:unknown*/ = a();
const tmpBinBothRhs /*:unknown*/ = b();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$3);
const tmpBinBothLhs$1 /*:unknown*/ = a();
const tmpBinBothRhs$1 /*:unknown*/ = a();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = function () {
  const arr = [1, 2, 3];
  a = function () {
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
const b = a;
$(a());
$(b());
const tmpBinBothLhs = a();
$(tmpBinBothLhs === b());
const tmpBinBothLhs$1 = a();
$(tmpBinBothLhs$1 === a());
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
const e = a();
$( e );
const f = d();
$( f );
const g = a();
const h = d();
const i = g === h;
$( i );
const j = a();
const k = a();
const l = j === k;
$( l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
b = a;
let tmpCalleeParam = a();
$(tmpCalleeParam);
let tmpCalleeParam$1 = b();
$(tmpCalleeParam$1);
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
let tmpCalleeParam$3 = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$3);
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = a();
let tmpCalleeParam$5 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - 3: false
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
