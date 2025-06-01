# Preval test case

# alias_same_string.md

> Ternary alias > Ai silly contrived > Alias same string
>
> Both vars initialized to the same string, but alias is only assigned in else branch: NOT safe to replace

## Input

`````js filename=intro
const x = $(true);
let a = "foo";
let b = "foo";
if (x) {} else { b = a; }
$(b);
// Expect: No change, because b can be either "foo" or a depending on the branch; aliasing is only safe if b = a in all branches.
`````


## Settled


`````js filename=intro
$(true);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = `foo`;
let b = `foo`;
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
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
