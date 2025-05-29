# Preval test case

# self_assign_closure1.md

> Self assign > Closure > Array closures > Self assign closure1
>
> See self_assign_closure rule

## Input

`````js filename=intro
// SHOULD get inlined because a gets sealed after the first call and is not aliased
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
$(a() === a());
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
const tmpBinBothLhs = a();
const tmpBinBothRhs = a();
let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
