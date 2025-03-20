# Preval test case

# returned_and_called.md

> Return param > Returned and called
>
> Returning a static param mutation but also reading it so we can't just eliminate it

## Input

`````js filename=intro
function f(g) {
  let y = g(1);
  $(y);
  return y;
}
$(f(function(a){ $(a, 'first'); }));
$(f(function(a){ $(a, 'second'); }));
$(f(function(a){ $(a, 'third'); }));
`````


## Settled


`````js filename=intro
$(1, `first`);
$(undefined);
$(undefined);
$(1, `second`);
$(undefined);
$(undefined);
$(1, `third`);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, `first`);
$(undefined);
$(undefined);
$(1, `second`);
$(undefined);
$(undefined);
$(1, `third`);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, "first" );
$( undefined );
$( undefined );
$( 1, "second" );
$( undefined );
$( undefined );
$( 1, "third" );
$( undefined );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'first'
 - 2: undefined
 - 3: undefined
 - 4: 1, 'second'
 - 5: undefined
 - 6: undefined
 - 7: 1, 'third'
 - 8: undefined
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
