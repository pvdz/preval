# Preval test case

# assign_ident.md

> Try > Noop > Assign ident
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = x;
  } catch {}
  return y;
}
$(f(50));
`````


## Settled


`````js filename=intro
$(50);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(50);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 50 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = x;
  } catch (e) {}
  return y;
};
let tmpCalleeParam = f(50);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
