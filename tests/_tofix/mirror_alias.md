# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident opt call simple
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
let a /*:unknown*/ = undefined;
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpIfTest = undefined;
if (!($ == null)) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  $($(100));
  $(a);
} else {
  $($(200));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
if (b) {
  const e = $( 100 );
  $( e );
  $( a );
}
else {
  const f = $( 200 );
  $( f );
  $( a );
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
