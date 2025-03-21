# Preval test case

# no__cond_read_before_write.md

> Binding > Promote const > No  cond read before write
>
> Test case where the read of a var binding occurs before the write, even if it never does so (though preval won't be able to assert this).

We can't make x a constant.

## Input

`````js filename=intro
var x;
{
  if ($(0)) {
    $(x, 'fail'); // never procs but preval can't discover that
  }
  x = 10;
  if ($(1)) {
    $(x);
  }
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(undefined, `fail`);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  $(10);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(undefined, `fail`);
}
if ($(1)) {
  $(10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( undefined, "fail" );
}
const b = $( 1 );
if (b) {
  $( 10 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
