# Preval test case

# alias_decl_before_if.md

> Ternary alias > Ai silly contrived > Alias decl before if
>
> Decl before if, assignment in if branch

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) { b = a; }
$(b);
// Expect: b is replaced with a, b's decl/assign removed
`````


## Settled


`````js filename=intro
$(true);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
  b = a;
  $(a);
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
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
