# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > For b > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; !$(100); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
if (tmpIfTest) {
} else {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$1 /*:unknown*/ = $(100);
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(100)) {
  while (true) {
    $(1);
    if ($(100)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const b = $( 100 );
    if (b) {
      break;
    }
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
