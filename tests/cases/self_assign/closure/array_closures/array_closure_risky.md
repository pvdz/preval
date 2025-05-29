# Preval test case

# array_closure_risky.md

> Self assign > Closure > Array closures > Array closure risky
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the array that's being closed uses a value that is not available until right before the call
> It showcases the need for moving the first part of the function to right before the first call
> rather than just moving it before the function itself.

## Input

`````js filename=intro
// SHOULD get inlined because a gets sealed after the first call and is not aliased
var a = function() {
  const arr = [1, x, 3];
  a = function(){
    return arr;
  };
  return a();
}
const x = 2;
$(a()); // In this case the function can be collapsed immediately
var b = a;
$(b());
// Reference check (should be different closure)
$(a() === b());
// Reference check (should be same closure)
$(a() === a());
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
$(arr);
$(arr);
$(true);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
$(arr);
$(arr);
$(true);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( a );
$( true );
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
a = function () {
  debugger;
  const arr = [1, x, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
const x = 2;
let tmpCalleeParam = a();
$(tmpCalleeParam);
b = a;
let tmpCalleeParam$1 = a();
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


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - 3: true
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
