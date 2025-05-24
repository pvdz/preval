# Preval test case

# else_nested_if.md

> If test aliased > Else nested if
>
> Alias `a = !c` used in `else` of outer `if(c)`,

## Input

`````js filename=intro
// but inside the consequent of a nested `if(d)`.
// `a` should become `true`.
let c = $(false);
let d = $(true);
let a = !c;
if (c) {
  // ...
} else {
  if (d) {
    $(a); // Expected: $(true)
  }
}

// Expected:
// let c = $(false);
// let d = $(true);
// let a = !c;
// if (c) {
//   // ...
// } else {
//   if (d) {
//     $(true);
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
    $(true);
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
    $(true);
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
    $( true );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let d = $(true);
let a = !c;
if (c) {
} else {
  if (d) {
    $(a);
  } else {
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
