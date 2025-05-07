# Preval test case

# self_assign_closure2.md

> Self assign closure > Self assign closure2
>
> See self_assign_closure rule

## Input

`````js filename=intro
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
$(a()[2]);
$(a()[1]);
`````


## Settled


`````js filename=intro
$(3);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 2 );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
