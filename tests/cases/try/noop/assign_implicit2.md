# Preval test case

# assign_implicit2.md

> Try > Noop > Assign implicit2
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = $;
  } catch {}
  return y;
}
$(f(x));
`````


## Settled


`````js filename=intro
x;
$($);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$($);
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( $ );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = 100;
  try {
    y = $;
  } catch (e) {}
  return y;
};
let tmpCalleeParam = f(x);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
