# Preval test case

# if-vars.md

> Normalize > Return > If-vars
>
> When the if branch ends with an update to the binding that is returned afterwards, return it immediately.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
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
  $(undefined, `result`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $($(1, `a`), `result`);
} else {
  $(undefined, `result`);
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
  $( undefined, "result" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(1, `a`);
    return x;
  } else {
    return x;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam, `result`);
`````


## Todos triggered


None


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
