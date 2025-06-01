# Preval test case

# alias_to_const.md

> Ternary alias > Ai silly contrived > Alias to const
>
> Aliased variable is a const, but alias is only assigned in else branch: NOT safe to replace

## Input

`````js filename=intro
const x = $(true);
const a = 1;
let b = undefined;
if (x) {} else { b = a; }
$(b);
// Expect: No change, because b can be either 1 or a depending on the branch; aliasing is only safe if b = a in all branches.
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(undefined);
} else {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(undefined);
} else {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( undefined );
}
else {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const a = 1;
let b = undefined;
if (x) {
  $(b);
} else {
  b = a;
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
