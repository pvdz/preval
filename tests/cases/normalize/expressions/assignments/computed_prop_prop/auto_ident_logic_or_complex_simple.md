# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(0)) || 2)];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  $coerce(a, `string`);
  $(a);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $coerce(a, `string`);
  $(a);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $coerce( b, "string" );
  $( b );
}
else {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
const tmpCalleeParam = a;
tmpCompObj[tmpCalleeParam];
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
