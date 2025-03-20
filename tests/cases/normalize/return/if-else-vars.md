# Preval test case

# if-else-vars.md

> Normalize > Return > If-else-vars
>
> When both branches end with an update to the binding that is returned, return it immediately.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
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
  const tmpClusterSSA_x /*:unknown*/ = $(1, `a`);
  $(tmpClusterSSA_x, `result`);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(2, `b`);
  $(tmpClusterSSA_x$1, `result`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $($(1, `a`), `result`);
} else {
  $($(2, `b`), `result`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1, "a" );
  $( b, "result" );
}
else {
  const c = $( 2, "b" );
  $( c, "result" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 1, 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
