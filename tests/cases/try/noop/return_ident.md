# Preval test case

# return_ident.md

> Try > Noop > Return ident
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  try {
    return x;
  } catch {}
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
  try {
    return x;
  } catch (e) {}
  return undefined;
};
let tmpCalleeParam = f(50);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


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
