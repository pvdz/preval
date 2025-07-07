# Preval test case

# member_expression_in_block.md

> Let scoping > Ai > Member expression in block
>
> Test let scoping with member expression in block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
const obj = { prop: $(2) };
if ($(true)) {
  if ($(true)) x = $(3);
  $(() => x);
  $(x);
  $(obj[x]);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  let x /*:unknown*/ = 1;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  const obj /*:object*/ /*truthy*/ = { prop: tmpObjLitVal };
  const tmpCalleeParam$1 /*:unknown*/ = obj[x];
  $(tmpCalleeParam$1);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
const tmpObjLitVal = $(2);
if ($(true)) {
  let x = 1;
  if ($(true)) {
    x = $(3);
  }
  $(function () {
    return x;
  });
  $(x);
  $({ prop: tmpObjLitVal }[x]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
const b = $( 2 );
const c = $( true );
if (c) {
  let d = 1;
  const e = $( true );
  if (e) {
    d = $( 3 );
  }
  const f = function() {
    debugger;
    return d;
  };
  $( f );
  $( d );
  const g = { prop: b };
  const h = g[ d ];
  $( h );
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
const tmpObjLitVal = $(2);
const obj = { prop: tmpObjLitVal };
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  let tmpCalleeParam$1 = obj[x];
  $(tmpCalleeParam$1);
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
 - 3: 2
 - 4: true
 - 5: true
 - 6: 3
 - 7: '<function>'
 - 8: 3
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
