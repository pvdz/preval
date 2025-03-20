# Preval test case

# if-else_redundant.md

> Normalize > Return > If-else redundant
>
> Unused return statements should be eliminated

This is regular DCE

## Input

`````js filename=intro
function f() {
  if ($(1)) return $(1);
  else return $(2);
  return;
}

$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(1);
  $(tmpReturnArg);
} else {
  const tmpReturnArg$1 /*:unknown*/ = $(2);
  $(tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $($(1));
} else {
  $($(2));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  $( b );
}
else {
  const c = $( 2 );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
