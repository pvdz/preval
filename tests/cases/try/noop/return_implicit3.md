# Preval test case

# return_implicit3.md

> Try > Noop > Return implicit3
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
    return $;
  } catch {}
}
$(f(50));
`````


## Settled


`````js filename=intro
$($);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $ );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
