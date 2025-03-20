# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > For a > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for ($(b)["c"]; $(0); );
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
tmpCompObj.c;
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(0);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
$(b).c;
if ($(0)) {
  while (true) {
    if (!$(0)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
b.c;
const c = $( 0 );
if (c) {
  while ($LOOP_UNROLL_10) {
    const d = $( 0 );
    if (d) {

    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
`````


## Todos triggered


- regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 0
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
