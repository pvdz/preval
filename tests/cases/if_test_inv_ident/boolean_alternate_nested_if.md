# Preval test case

# boolean_alternate_nested_if.md

> If test inv ident > Boolean alternate nested if
>
> Alias `a = Boolean(c)` used in `else` of `if(c)`,

## Input

`````js filename=intro
// inside the consequent of a nested `if(d)`.
// `a` should become `false`.
let c = $(false);
let d = $(true);
let a = Boolean(c);
if (c) {
  // ...
} else {
  if (d) {
    $(a); // Expected: $(false)
  }
}

// Expected:
// let c = $(false);
// let d = $(true);
// let a = Boolean(c);
// if (c) {
//   // ...
// } else {
//   if (d) {
//     $(false);
//   }
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(false);
const d /*:unknown*/ = $(true);
if (c) {
} else {
  if (d) {
    $(false);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(false);
const d = $(true);
if (!c) {
  if (d) {
    $(false);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
const b = $( true );
if (a) {

}
else {
  if (b) {
    $( false );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let d = $(true);
let a = $boolean_constructor(c);
if (c) {
} else {
  if (d) {
    $(a);
  } else {
  }
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
