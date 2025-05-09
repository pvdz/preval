# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $?.(1))];
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const a /*:unknown*/ = $(1);
  $coerce(a, `string`);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
} else {
  const a = $(1);
  $coerce(a, `string`);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
}
else {
  const b = $( 1 );
  $coerce( b, "string" );
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
