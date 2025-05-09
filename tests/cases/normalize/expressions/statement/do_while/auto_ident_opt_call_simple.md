# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($?.(1));
$(a);
`````


## Settled


`````js filename=intro
$(100);
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  tmpIfTest = $(1);
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpIfTest$4 /*:boolean*/ = $ == null;
    if (tmpIfTest$4) {
    } else {
      tmpIfTest$2 = $(1);
    }
    if (tmpIfTest$2) {
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
$(100);
let tmpIfTest = undefined;
if (!($ == null)) {
  tmpIfTest = $(1);
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$2 = undefined;
    if (!($ == null)) {
      tmpIfTest$2 = $(1);
    }
    if (!tmpIfTest$2) {
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
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  a = $( 1 );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let c = undefined;
    const d = $ == null;
    if (d) {

    }
    else {
      c = $( 1 );
    }
    if (c) {

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
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
