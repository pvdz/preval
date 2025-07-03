# Preval test case

# back2back_ref.md

> Ssa > Back2back ref
>
> This may be an artifact through using ++x

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = $(5);
    ++x;
    $(x);
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(5);
  const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
  const tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent + 1;
  $(tmpClusterSSA_x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(Number($(5)) + 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = $coerce( a, "number" );
  const c = b + 1;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(5);
    const tmpPostUpdArgIdent = $coerce(x, `number`);
    x = tmpPostUpdArgIdent + 1;
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
