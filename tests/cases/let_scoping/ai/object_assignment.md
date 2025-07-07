# Preval test case

# object_assignment.md

> Let scoping > Ai > Object assignment
>
> Test let scoping: let assigned an object and used in block

## Input

`````js filename=intro
let x = undefined;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = { prop: $(1) };
  $(() => x);
  $(x);
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
  let x /*:unknown*/ = undefined;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    const tmpObjLitVal /*:unknown*/ = $(1);
    x = { prop: tmpObjLitVal };
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
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
  let x = undefined;
  if ($(true)) {
    const tmpObjLitVal = $(1);
    x = { prop: tmpObjLitVal };
  }
  $(function () {
    return x;
  });
  $(x);
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
  let c = undefined;
  const d = $( true );
  if (d) {
    const e = $( 1 );
    c = { prop: e };
  }
  const f = function() {
    debugger;
    return c;
  };
  $( f );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    const tmpObjLitVal = $(1);
    x = { prop: tmpObjLitVal };
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
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
 - 5: 1
 - 6: '<function>'
 - 7: { prop: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
