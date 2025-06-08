# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Statement > Logic or both > Auto ident prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b)).c || (1, 2, $(b)).c;
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpIfTest /*:unknown*/ = tmpCompObj.c;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompObj$1 /*:unknown*/ = $(b);
  tmpCompObj$1.c;
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
  $(a, b);
} else {
  $(b).c;
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
  $( d, a );
}
else {
  const e = $( a );
  e.c;
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
  $(a, b);
} else {
  const tmpCompObj$1 = $(b);
  tmpCompObj$1.c;
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
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
