# Preval test case

# tandem_constants.md

> Tofix > tandem constants
>
> When two consts are initialized to the same value, whatever the value, they are aliases and should be reduced.
> When it concerns two lets, it still applies if the mutation always happens in tandem.

## Options

- globals: z zz

## Input

`````js filename=intro
let x;
let y;
x = z;
y = z;
if ($(x)) {
  $('a');
} else if ($(y)) {
  $('b');
}
$(x, y);
x = zz;
y = zz;
if ($(x)) {
  $('c');
} else if ($(y)) {
  $('d');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = z;
z;
const tmpIfTest /*:unknown*/ = $(x);
if (tmpIfTest) {
  $(`a`);
  $(x, x);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(x);
  if (tmpIfTest$1) {
    $(`b`);
    $(x, x);
  } else {
    $(x, x);
  }
}
const tmpClusterSSA_x /*:unknown*/ = zz;
zz;
const tmpIfTest$3 /*:unknown*/ = $(tmpClusterSSA_x);
if (tmpIfTest$3) {
  $(`c`);
} else {
  const tmpIfTest$5 /*:unknown*/ = $(tmpClusterSSA_x);
  if (tmpIfTest$5) {
    $(`d`);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = z;
z;
if ($(x)) {
  $(`a`);
  $(x, x);
} else {
  if ($(x)) {
    $(`b`);
    $(x, x);
  } else {
    $(x, x);
  }
}
const tmpClusterSSA_x = zz;
zz;
if ($(tmpClusterSSA_x)) {
  $(`c`);
} else {
  if ($(tmpClusterSSA_x)) {
    $(`d`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = z;
z;
const b = $( a );
if (b) {
  $( "a" );
  $( a, a );
}
else {
  const c = $( a );
  if (c) {
    $( "b" );
    $( a, a );
  }
  else {
    $( a, a );
  }
}
const d = zz;
zz;
const e = $( d );
if (e) {
  $( "c" );
}
else {
  const f = $( d );
  if (f) {
    $( "d" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let y = undefined;
x = z;
y = z;
const tmpIfTest = $(x);
if (tmpIfTest) {
  $(`a`);
  $(x, y);
} else {
  const tmpIfTest$1 = $(y);
  if (tmpIfTest$1) {
    $(`b`);
    $(x, y);
  } else {
    $(x, y);
  }
}
x = zz;
y = zz;
const tmpIfTest$3 = $(x);
if (tmpIfTest$3) {
  $(`c`);
} else {
  const tmpIfTest$5 = $(y);
  if (tmpIfTest$5) {
    $(`d`);
  } else {
  }
}
`````


## Todos triggered


None


## Globals


None (except for the 2 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
