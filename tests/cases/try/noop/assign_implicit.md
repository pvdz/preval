# Preval test case

# assign_implicit.md

> Try > Noop > Assign implicit
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = xyz;
  } catch {}
  return y;
}
$(f(50));
`````


## Settled


`````js filename=intro
let y /*:unknown*/ = 100;
try {
  y = xyz;
} catch (e) {}
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let y = 100;
try {
  y = xyz;
} catch (e) {}
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 100;
try {
  a = xyz;
}
catch (b) {

}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = xyz;
  } catch (e) {}
  return y;
};
let tmpCalleeParam = f(50);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

xyz


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
