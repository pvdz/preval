# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and left > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))[$("c")] && $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`c`);
const tmpIfTest /*:unknown*/ = tmpCompObj[tmpCalleeParam];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const tmpIfTest = tmpCompObj[tmpCalleeParam];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
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
const c = $( "c" );
const d = b[ c ];
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  $( 100 );
  $( e, a );
}
else {
  $( e, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const tmpIfTest = tmpCompObj[tmpCalleeParam];
if (tmpIfTest) {
  $(100);
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
 - 2: 'c'
 - 3: 100
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
