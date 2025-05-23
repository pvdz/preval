# Preval test case

# global_call_prop.md

> Normalize > Nullish > Global call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)??foo);
`````


## Settled


`````js filename=intro
$(15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(15);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 15 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 15;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = foo;
  $(foo);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
