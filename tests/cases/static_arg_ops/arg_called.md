# Preval test case

# arg_called.md

> Static arg ops > Arg called
>
> Triggering static arg op outlining when calling the arg

## Input

`````js filename=intro
let f = function (func) {
  const a = func(1);
  if ($) {
    return a;
  }
};
$(f($));
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
if ($) {
  $(a);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
if ($) {
  $(a);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if ($) {
  $( a );
}
else {
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
