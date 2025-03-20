# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : (1, 2, b)[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  const tmpCompProp /*:unknown*/ = $(`c`);
  b[tmpCompProp];
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
const b = { c: 1 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  const tmpCompProp = $(`c`);
  b[tmpCompProp];
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
const c = { c: 1 };
if (a) {
  $( 100 );
  $( b, c );
}
else {
  const d = $( "c" );
  c[ d ];
  $( b, c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
