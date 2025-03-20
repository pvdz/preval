# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > For c > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, $(b))?.x);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { x: 1 };
  const tmpChainRootProp /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
  if (tmpIfTest$1) {
  } else {
    tmpChainRootProp.x;
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpChainRootProp$1 /*:unknown*/ = $(b);
      const tmpIfTest$4 /*:boolean*/ = tmpChainRootProp$1 == null;
      if (tmpIfTest$4) {
      } else {
        tmpChainRootProp$1.x;
      }
    } else {
      break;
    }
  }
  $(undefined);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const b = { x: 1 };
  const tmpChainRootProp = $(b);
  if (!(tmpChainRootProp == null)) {
    tmpChainRootProp.x;
  }
  while (true) {
    if ($(1)) {
      const tmpChainRootProp$1 = $(b);
      if (!(tmpChainRootProp$1 == null)) {
        tmpChainRootProp$1.x;
      }
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { x: 1 };
  const c = $( b );
  const d = c == null;
  if (d) {

  }
  else {
    c.x;
  }
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( b );
      const g = f == null;
      if (g) {

      }
      else {
        f.x;
      }
    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 1
 - 4: { x: '1' }
 - 5: 1
 - 6: { x: '1' }
 - 7: 1
 - 8: { x: '1' }
 - 9: 1
 - 10: { x: '1' }
 - 11: 1
 - 12: { x: '1' }
 - 13: 1
 - 14: { x: '1' }
 - 15: 1
 - 16: { x: '1' }
 - 17: 1
 - 18: { x: '1' }
 - 19: 1
 - 20: { x: '1' }
 - 21: 1
 - 22: { x: '1' }
 - 23: 1
 - 24: { x: '1' }
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
