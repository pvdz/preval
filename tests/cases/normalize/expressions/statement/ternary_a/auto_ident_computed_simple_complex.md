# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
b[$("c")] ? $(100) : $(200);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpIfTest /*:unknown*/ = b[tmpCalleeParam];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  $(200);
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
  $(100);
  $(a, b);
} else {
  $(200);
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
  $( 100 );
  $( d, b );
}
else {
  $( 200 );
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
  $(100);
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
 - 1: 'c'
 - 2: 100
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
