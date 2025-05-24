# Preval test case

# boolean_alternate_multiple_uses.md

> If test aliased > Boolean alternate multiple uses
>
> ultiple uses of bool

## Input

`````js filename=intro
let d = $(false);
let b = Boolean(d);
if (d) {
  // ...
} else {
  $(b); // Expected: $(false)
  let x = 10;
  $(b); // Expected: $(false)
}

// Expected:
// let d = $(false);
// let b = Boolean(d);
// if (d) {
//   // ...
// } else {
//   $(false);
//   let x = 10;
//   $(false);
// }
`````


## Settled


`````js filename=intro
const d /*:unknown*/ = $(false);
if (d) {
} else {
  $(false);
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  $(false);
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  $( false );
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let d = $(false);
let b = $boolean_constructor(d);
if (d) {
} else {
  $(b);
  let x = 10;
  $(b);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
