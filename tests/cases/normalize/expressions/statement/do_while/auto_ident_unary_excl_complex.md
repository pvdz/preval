# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (!$(100));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpIfTest /*:unknown*/ = $(100);
if (tmpIfTest) {
} else {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$1 /*:unknown*/ = $(100);
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if (!$(100)) {
  while (true) {
    $(100);
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
$( 100 );
const a = $( 100 );
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    $( 100 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpIfTest = $(100);
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
