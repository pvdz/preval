# Preval test case

# dupe_binding.md

> Primitive arg inlining > Dupe binding
>
> If we're going to clone functions to inline them then we're going to run into problems with functions with bindings because their name won't be unique...

This should do something like a 
```js
function f(a, b) {
  $(a, b);
  return a;
}
function f_prime(a, b) {
  $(100, b);
  return 100;
}
$(f($(1), $(2)), 'outer1');
$(f(100, $(200)), 'outer2');
```

After which the `b` identifier is no longer a unique binding.

This is easy to fix for the example but harder to fix for a generic clone.

## Input

`````js filename=intro
function f(a, b) {
  $(a, b);
  return a;
}
$(f($(1), $(2)), 'outer1');
$(f(100, $(200)), 'outer2');
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
$(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam$1, `outer1`);
const tmpCalleeParam$7 /*:unknown*/ = $(200);
$(100, tmpCalleeParam$7);
$(100, `outer2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
$(tmpCalleeParam$1, $(2));
$(tmpCalleeParam$1, `outer1`);
$(100, $(200));
$(100, `outer2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
$( a, b );
$( a, "outer1" );
const c = $( 200 );
$( 100, c );
$( 100, "outer2" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1, 'outer1'
 - 5: 200
 - 6: 100, 200
 - 7: 100, 'outer2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
