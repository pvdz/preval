# Preval test case

# array_closure_more.md

> Self assign > Closure > Array closures > Array closure more
>
> This is targeting a specific trick used by certain obfuscators.
> In this case the outer function replaces itself with a closure for an array it creates.
> But as long as the function is only ever called, this can be inlined into a global ref.

## Input

`````js filename=intro
// SHOULD get inlined because a gets sealed after the first call and is not aliased
var a = function() {
  const arr = [1, 2, 3];
  a = function(){
    return arr;
  };
  return a();
}
$(a());
$(a() === a());
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [1, 2, 3];
$(a);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
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
const tmpBinBothLhs = a();
const tmpBinBothRhs = a();
let tmpCalleeParam$1 = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
