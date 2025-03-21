# Preval test case

# return_implicit.md

> Try > Noop > Return implicit
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
    return xyz;
  } catch {}
}
$(f(50));
`````


## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
try {
  tmpCalleeParam = xyz;
} catch (e) {}
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
try {
  tmpCalleeParam = xyz;
} catch (e) {}
$(tmpCalleeParam);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  a = xyz;
}
catch (b) {

}
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

xyz


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
