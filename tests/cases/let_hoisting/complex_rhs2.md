# Preval test case

# complex_rhs2.md

> Let hoisting > Complex rhs2
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
let danger = function () {
  if ($(true)) {
    danger = null;
    return 1;
  }
};
const f = function () {
  if ($(true)) $(x);
};
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($(true)) {
  f();
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:primitive*/ /*ternaryConst*/ = 1;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
} else {
  x = undefined;
}
const tmpIfTest$3 /*:unknown*/ = $(true);
if (tmpIfTest$3) {
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    $(x);
  } else {
  }
  const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
if (!$(true)) {
  x = undefined;
}
if ($(true)) {
  if ($(true)) {
    $(x);
  }
  $($(`do not inline me`));
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( true );
if (b) {

}
else {
  a = undefined;
}
const c = $( true );
if (c) {
  const d = $( true );
  if (d) {
    $( a );
  }
  const e = $( "do not inline me" );
  $( e );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let danger = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    danger = null;
    return 1;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
let x = danger();
const tmpIfTest$3 = $(true);
if (tmpIfTest$3) {
  f();
  x = $(`do not inline me`);
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: 1
 - 5: 'do not inline me'
 - 6: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
