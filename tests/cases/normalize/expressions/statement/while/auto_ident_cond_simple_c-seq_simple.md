# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond simple c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (1 ? (40, 50, $(60)) : $($(100))) $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(60);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$1 /*:unknown*/ = $(60);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(60)) {
  while (true) {
    $(100);
    if (!$(60)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const b = $( 60 );
    if (b) {

    }
    else {
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
  let tmpIfTest = undefined;
  tmpIfTest = $(60);
  if (tmpIfTest) {
    $(100);
  } else {
    break;
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
 - 1: 60
 - 2: 100
 - 3: 60
 - 4: 100
 - 5: 60
 - 6: 100
 - 7: 60
 - 8: 100
 - 9: 60
 - 10: 100
 - 11: 60
 - 12: 100
 - 13: 60
 - 14: 100
 - 15: 60
 - 16: 100
 - 17: 60
 - 18: 100
 - 19: 60
 - 20: 100
 - 21: 60
 - 22: 100
 - 23: 60
 - 24: 100
 - 25: 60
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
