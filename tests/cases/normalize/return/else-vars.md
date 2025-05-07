# Preval test case

# else-vars.md

> Normalize > Return > Else-vars
>
> When both branches end with an update to the binding that is returned, return it immediately.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    $(100);
  } else {
    x = $(2, 'b');
  }
  return x;
}
$(f(), 'result');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(100);
  $(undefined, `result`);
} else {
  const x /*:unknown*/ = $(2, `b`);
  $(x, `result`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(100);
  $(undefined, `result`);
} else {
  $($(2, `b`), `result`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 100 );
  $( undefined, "result" );
}
else {
  const b = $( 2, "b" );
  $( b, "result" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: undefined, 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
