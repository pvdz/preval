# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
b[$("c")] || b[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpIfTest /*:unknown*/ = b[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompProp$1 /*:unknown*/ = $(`c`);
  b[tmpCompProp$1];
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpIfTest = b[tmpCompProp];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCompProp$1 = $(`c`);
  b[tmpCompProp$1];
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
