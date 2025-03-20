# Preval test case

# var_body2.md

> Normalize > Try > Finally > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} finally {
  var x = 10;
}
$(x);
`````


## Settled


`````js filename=intro
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
