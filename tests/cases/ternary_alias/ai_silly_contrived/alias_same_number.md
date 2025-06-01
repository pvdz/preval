# Preval test case

# alias_same_number.md

> Ternary alias > Ai silly contrived > Alias same number
>
> Both vars initialized to the same number, but alias is only assigned in else branch: NOT safe to replace

## Input

`````js filename=intro
const x = $(true);
let a = 42;
let b = 42;
if (x) {} else { b = a; }
$(b);
// Expect: No change, because b can be either 42 or a depending on the branch; aliasing is only safe if b = a in all branches.
`````


## Settled


`````js filename=intro
$(true);
$(42);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(42);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( 42 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = 42;
let b = 42;
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
 - 2: 42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
