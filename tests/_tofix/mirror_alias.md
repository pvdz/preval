# Preval test case

# mirror_alias.md

> Tofix > mirror alias
>
> Normalization of assignments should work the same everywhere they are

This is something similar to if_flip except it happens across branches.
In this example the alias_for_x_to_test var is really an alias to
x and is kept in sync with x at all times.
We may be able to detect that alias_for_x_to_test is always kept in sync
with x (in other words: user can't detect cases where they're not in sync)
and then alias them.
That should lead to the second `if` being folded into the `else` of the
first one, since preval will then now that alias_for_x_to_test is undefined.

## Input

`````js filename=intro
let x /*:unknown*/ = undefined;
let alias_for_x_to_test /*:unknown*/ = undefined;
const test /*:boolean*/ = $ == null;
if (test) {
} else {
  const next /*:unknown*/ = $(1);
  x = next;
  alias_for_x_to_test = next;
}
if (alias_for_x_to_test) {
  const t /*:unknown*/ = $(100);
  $(t);
  $(x);
} else {
  const r /*:unknown*/ = $(200);
  $(r);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ /*ternaryConst*/ = undefined;
const test /*:boolean*/ = $ == null;
if (test) {
} else {
  x = $(1);
}
if (x) {
  const t /*:unknown*/ = $(100);
  $(t);
  $(x);
} else {
  const r /*:unknown*/ = $(200);
  $(r);
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if (!($ == null)) {
  x = $(1);
}
if (x) {
  $($(100));
  $(x);
} else {
  $($(200));
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  a = $( 1 );
}
if (a) {
  const c = $( 100 );
  $( c );
  $( a );
}
else {
  const d = $( 200 );
  $( d );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let alias_for_x_to_test = undefined;
const test = $ == null;
if (test) {
} else {
  const next = $(1);
  x = next;
  alias_for_x_to_test = next;
}
if (alias_for_x_to_test) {
  const t = $(100);
  $(t);
  $(x);
} else {
  const r = $(200);
  $(r);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
