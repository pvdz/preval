# Preval test case

# object_expression_in_block.md

> Let scoping > Ai > Object expression in block
>
> Test let scoping with object expression in block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(x);
  const obj = { prop: x, other: $(3) };
  $(() => x);
  $(obj);
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
    $(x);
  } else {
    $(x);
  }
  const tmpObjLitVal$1 /*:unknown*/ = $(3);
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  const obj /*:object*/ /*truthy*/ = { prop: x, other: tmpObjLitVal$1 };
  $(obj);
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
    $(x);
  } else {
    $(x);
  }
  const tmpObjLitVal$1 = $(3);
  $(function () {
    return x;
  });
  $({ prop: x, other: tmpObjLitVal$1 });
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
    $( c );
  }
  else {
    $( c );
  }
  const e = $( 3 );
  const f = function() {
    debugger;
    return c;
  };
  $( f );
  const g = {
    prop: c,
    other: e,
  };
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
    $(x);
  } else {
    $(x);
  }
  const tmpObjLitVal = x;
  const tmpObjLitVal$1 = $(3);
  const obj = { prop: tmpObjLitVal, other: tmpObjLitVal$1 };
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(obj);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: 2
 - 6: 2
 - 7: 3
 - 8: '<function>'
 - 9: { prop: '2', other: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
