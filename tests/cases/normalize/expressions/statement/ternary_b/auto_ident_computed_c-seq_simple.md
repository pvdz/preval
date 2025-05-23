# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(1) ? (1, 2, $(b))[$("c")] : $(200);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 1 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam /*:unknown*/ = $(`c`);
  tmpCompObj[tmpCalleeParam];
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 1 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`c`);
  tmpCompObj[tmpCalleeParam];
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( b );
  const e = $( "c" );
  d[ e ];
  $( c, b );
}
else {
  $( 200 );
  $( c, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCalleeParam = $(`c`);
  tmpCompObj[tmpCalleeParam];
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
