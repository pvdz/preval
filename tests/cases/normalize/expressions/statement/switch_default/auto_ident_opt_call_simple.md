# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $?.(1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpIfTest = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $ == null;
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  $( 1 );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
