# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("c")] || (1, 2, b)[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpIfTest /*:unknown*/ = b[tmpCalleeParam];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
  b[tmpCalleeParam$1];
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`c`);
const b = { c: 1 };
const tmpIfTest = b[tmpCalleeParam];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCalleeParam$1 = $(`c`);
  b[tmpCalleeParam$1];
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( d, b );
}
else {
  const e = $( "c" );
  b[ e ];
  $( d, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCalleeParam = $(`c`);
const tmpIfTest = tmpCompObj[tmpCalleeParam];
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompObj$1 = b;
  const tmpCalleeParam$1 = $(`c`);
  tmpCompObj$1[tmpCalleeParam$1];
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
