# Preval test case

# alias_decl_outside_if_assign_in_nested.md

> Ternary alias > Ai silly contrived > Alias decl outside if assign in nested
>
> Decl outside if, assignment in nested block

## Input

`````js filename=intro
const x = $(true), y = $(false);
let a = undefined;
let b = undefined;
if (x) {
  if (y) { b = a; }
}
$(b);
// Expect: No change, assignment not directly in if branch
`````


## Settled


`````js filename=intro
$(true);
$(false);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(false);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( false );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const y = $(false);
let a = undefined;
let b = undefined;
if (x) {
  if (y) {
    b = a;
    $(a);
  } else {
    $(b);
  }
} else {
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
