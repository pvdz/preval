# Preval test case

# surviving_let_complex_usage.md

> Let scoping > Ai > Surviving let complex usage
>
> Test let scoping: let used in complex expressions that survives and should be moved

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  const y = x + $(4);
  const z = [x, $(5)];
  const w = { prop: x, other: $(6) };
  $(() => x);
  $(x);
  $(y);
  $(z);
  $(w);
}
`````


## Settled


`````js filename=intro
$(2);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  let x /*:unknown*/ = 1;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  const tmpBinBothRhs /*:unknown*/ = $(4);
  const y /*:primitive*/ = x + tmpBinBothRhs;
  const tmpArrElement$1 /*:unknown*/ = $(5);
  const tmpObjLitVal$1 /*:unknown*/ = $(6);
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(y);
  const z /*:array*/ /*truthy*/ = [x, tmpArrElement$1];
  $(z);
  const w /*:object*/ /*truthy*/ = { prop: x, other: tmpObjLitVal$1 };
  $(w);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
if ($(true)) {
  $(false);
}
if ($(true)) {
  let x = 1;
  if ($(true)) {
    x = $(3);
  }
  const y = x + $(4);
  const tmpArrElement$1 = $(5);
  const tmpObjLitVal$1 = $(6);
  $(function () {
    return x;
  });
  $(x);
  $(y);
  $([x, tmpArrElement$1]);
  $({ prop: x, other: tmpObjLitVal$1 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( true );
if (a) {
  $( false );
}
const b = $( true );
if (b) {
  let c = 1;
  const d = $( true );
  if (d) {
    c = $( 3 );
  }
  const e = $( 4 );
  const f = c + e;
  const g = $( 5 );
  const h = $( 6 );
  const i = function() {
    debugger;
    return c;
  };
  $( i );
  $( c );
  $( f );
  const j = [ c, g ];
  $( j );
  const k = {
    prop: c,
    other: h,
  };
  $( k );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
$(2);
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  const tmpBinBothLhs = x;
  const tmpBinBothRhs = $(4);
  const y = tmpBinBothLhs + tmpBinBothRhs;
  const tmpArrElement = x;
  const tmpArrElement$1 = $(5);
  const z = [tmpArrElement, tmpArrElement$1];
  const tmpObjLitVal = x;
  const tmpObjLitVal$1 = $(6);
  const w = { prop: tmpObjLitVal, other: tmpObjLitVal$1 };
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(y);
  $(z);
  $(w);
} else {
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: true
 - 3: false
 - 4: true
 - 5: true
 - 6: 3
 - 7: 4
 - 8: 5
 - 9: 6
 - 10: '<function>'
 - 11: 3
 - 12: 7
 - 13: [3, 5]
 - 14: { prop: '3', other: '6' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
