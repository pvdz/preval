# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > While > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((1, 2, $(b))?.x) $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  tmpIfTest = tmpChainRootProp.x;
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ /*ternaryConst*/ = undefined;
    const tmpChainRootProp$1 /*:unknown*/ = $(b);
    const tmpIfTest$4 /*:boolean*/ = tmpChainRootProp$1 == null;
    if (tmpIfTest$4) {
    } else {
      tmpIfTest$2 = tmpChainRootProp$1.x;
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
let tmpIfTest = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
if (!(tmpChainRootProp == null)) {
  tmpIfTest = tmpChainRootProp.x;
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$2 = undefined;
    const tmpChainRootProp$1 = $(b);
    if (!(tmpChainRootProp$1 == null)) {
      tmpIfTest$2 = tmpChainRootProp$1.x;
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
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  a = c.x;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let e = undefined;
    const f = $( b );
    const g = f == null;
    if (g) {

    }
    else {
      e = f.x;
    }
    if (e) {

    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '1' }
 - 6: 100
 - 7: { x: '1' }
 - 8: 100
 - 9: { x: '1' }
 - 10: 100
 - 11: { x: '1' }
 - 12: 100
 - 13: { x: '1' }
 - 14: 100
 - 15: { x: '1' }
 - 16: 100
 - 17: { x: '1' }
 - 18: 100
 - 19: { x: '1' }
 - 20: 100
 - 21: { x: '1' }
 - 22: 100
 - 23: { x: '1' }
 - 24: 100
 - 25: { x: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
