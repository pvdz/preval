# Preval test case

# array_closure_call_first.md

> Self assign > Closure > Array closures > Array closure call first
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the array is not mutated nor reference checked, the values should be safe to access.
> The difference when calling it immediately is that we don't need to worry about the unique reference
> of the thing being closed. It'll always return the same value. Versus otherwise we have to be
> careful to maintain the semantics of always returning a unique reference.

Becomes something like

var a = function() {
  return arr;
}
const arr = [1, 2, 3];
$(a()); // In this case the function can be collapsed immediately

## Input

`````js filename=intro
// SHOULD get inlined because b is aliased to a AFTER we know a was called (and sealed)
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
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
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
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
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
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
