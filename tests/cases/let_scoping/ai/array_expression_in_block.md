# Preval test case

# array_expression_in_block.md

> Let scoping > Ai > Array expression in block
>
> Test let scoping with array expression in block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
  const arr = [x, $(3)];
  $(arr);
}
`````


## Settled


`````js filename=intro
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
    x = $(2);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  const tmpArrElement$1 /*:unknown*/ = $(3);
  const arr /*:array*/ /*truthy*/ = [x, tmpArrElement$1];
  $(arr);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
if ($(true)) {
  let x = 1;
  if ($(true)) {
    x = $(2);
  }
  $(function () {
    return x;
  });
  $(x);
  const tmpArrElement$1 = $(3);
  $([x, tmpArrElement$1]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
const b = $( true );
if (b) {
  let c = 1;
  const d = $( true );
  if (d) {
    c = $( 2 );
  }
  const e = function() {
    debugger;
    return c;
  };
  $( e );
  $( c );
  const f = $( 3 );
  const g = [ c, f ];
  $( g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(2);
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  const tmpArrElement = x;
  const tmpArrElement$1 = $(3);
  const arr = [tmpArrElement, tmpArrElement$1];
  $(arr);
} else {
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: 2
 - 6: '<function>'
 - 7: 2
 - 8: 3
 - 9: [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
