# Preval test case

# self_assign_closure_mutation.md

> Self assign > Closure > Array closures > Self assign closure mutation
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
$(a()[2]);
a()[1] = 'PASS'
$(a()[1]); // should reflect PASS
`````


## Settled


`````js filename=intro
$(3);
$(`PASS`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(`PASS`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( "PASS" );
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
const tmpCompObj = a();
let tmpCalleeParam = tmpCompObj[2];
$(tmpCalleeParam);
const tmpAssignMemLhsObj = a();
tmpAssignMemLhsObj[1] = `PASS`;
const tmpCompObj$1 = a();
let tmpCalleeParam$1 = tmpCompObj$1[1];
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 'PASS'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
