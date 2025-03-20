# Preval test case

# self_assign_closure1.md

> Self assign closure > Self assign closure1
>
> See self_assign_closure rule

## Input

`````js filename=intro
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
