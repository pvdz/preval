# Preval test case

# global_ident.md

> Normalize > Nullish > Global ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt??foo);
`````


## Settled


`````js filename=intro
$($Number_parseInt);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_parseInt);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_parseInt );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = parseInt;
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
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
