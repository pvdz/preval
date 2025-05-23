# Preval test case

# assign_implicit2.md

> Tdz > Assign implicit2
>
> Certain statements probably never benefit from running inside a try
> But the output `$($)` is incorrect as the reference would be caught and y remains 100

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = FAIL;
  } catch {}
  return y;
}
$(f(KEEP_ME));
`````


## Settled


`````js filename=intro
KEEP_ME;
let y /*:unknown*/ = 100;
try {
  y = FAIL;
} catch (e) {}
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
KEEP_ME;
let y = 100;
try {
  y = FAIL;
} catch (e) {}
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
KEEP_ME;
let a = 100;
try {
  a = FAIL;
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
    y = FAIL;
  } catch (e) {}
  return y;
};
let tmpCalleeParam = f(KEEP_ME);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

KEEP_ME, FAIL


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
