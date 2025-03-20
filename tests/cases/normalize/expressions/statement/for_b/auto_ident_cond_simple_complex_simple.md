# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Statement > For b > Auto ident cond simple complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; 1 ? $(2) : $($(100)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(2);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$1 /*:unknown*/ = $(2);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(2)) {
  while (true) {
    $(1);
    if (!$(2)) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const b = $( 2 );
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
