# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident cond simple complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? $(2) : $($(100))) && (1 ? $(2) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(2);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(2);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(2);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(2);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 2 );
  $( b );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
tmpIfTest = $(2);
if (tmpIfTest) {
  $(2);
  $(a);
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
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
