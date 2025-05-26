# Preval test case

# else_if_test_is_alias_itself_fail.md

> If test inv ident > Else if test is alias itself fail
>
> The `if` condition is the alias `a` itself, where `a = !c`.

## Input

`````js filename=intro
// The rule is about `a`'s value based on `c`'s test, not `a`'s test.
// No transformation expected from *this* rule in the `else` based on `if(a)`.
let c = $(true);
let a = !c; // so a is false
if (a) { // if (false)
  // ...
} else {
  $(a); // Expected: $(a) (which is $(false)), not $(true) from this rule.
}

// Expected:
// let c = $(true);
// let a = !c;
// if (a) {
//   // ...
// } else {
//   $(a);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let a = !c;
if (a) {
} else {
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
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
