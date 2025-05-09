# Preval test case

# if-else_first.md

> Normalize > Return > If-else first
>
> Unused return statements should be eliminated

## Input

`````js filename=intro
function f() {
  if ($(1)) return;
  else return $(2);
}

$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(2);
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(undefined);
} else {
  $($(2));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( undefined );
}
else {
  const b = $( 2 );
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
