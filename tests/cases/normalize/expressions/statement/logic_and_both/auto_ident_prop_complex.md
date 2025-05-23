# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(b).c && $(b).c;
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpIfTest /*:unknown*/ = tmpCompObj.c;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompObj$1 /*:unknown*/ = $(b);
  tmpCompObj$1.c;
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpIfTest = $(b).c;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(b).c;
  $(a, b);
} else {
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = $( a );
  e.c;
  $( d, a );
}
else {
  $( d, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpIfTest = tmpCompObj.c;
if (tmpIfTest) {
  const tmpCompObj$1 = $(b);
  tmpCompObj$1.c;
  $(a, b);
} else {
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: { c: '1' }
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
