# Preval test case

# if_x_lt_0_if_nan_gte_x.md

> If test transitive > Gen > If x lt 0 if nan gte x
>
> if_x_lt_0_if_nan_gte_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x < 0) {
    if (NaN >= x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x < 0) {
    $('a', x < 0, NaN >= x);
    if (NaN >= x) $('b', x < 0, NaN >= x);
    else $('c', x < 0, NaN >= x);
  }
  else $('d', x < 0, NaN >= x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x < 0) {
    $('a');
    if (NaN >= x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x < 0) {
    if (NaN >= x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x < 0) {
    $('b');
    if (NaN >= x) $('c');
    else $('d');
    $('e');
  }
  else $('f');
  $('g');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
const tmpIfTest /*:boolean*/ = x < 0;
if (tmpIfTest) {
  x ** 0;
  $(`b`);
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = x$1 < 0;
const tmpCalleeParam /*:boolean*/ = x$1 < 0;
x$1 ** 0;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, false);
  x$1 ** 0;
  x$1 ** 0;
  $(`c`, true, false);
} else {
  $(`d`, tmpCalleeParam, false);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = x$3 < 0;
if (tmpIfTest$7) {
  $(`a`);
  x$3 ** 0;
  $(`c`);
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = x$5 < 0;
if (tmpIfTest$11) {
  x$5 ** 0;
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$15 /*:boolean*/ = x$7 < 0;
if (tmpIfTest$15) {
  $(`b`);
  x$7 ** 0;
  $(`d`);
  $(`e`);
  $(`g`);
} else {
  $(`f`);
  $(`g`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
if (x < 0) {
  x ** 0;
  $(`b`);
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 < 0;
const tmpCalleeParam = x$1 < 0;
x$1 ** 0;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, false);
  x$1 ** 0;
  x$1 ** 0;
  $(`c`, true, false);
} else {
  $(`d`, tmpCalleeParam, false);
}
const x$3 = $(true);
if (x$3 < 0) {
  $(`a`);
  x$3 ** 0;
  $(`c`);
} else {
  $(`d`);
}
const x$5 = $(true);
if (x$5 < 0) {
  x$5 ** 0;
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 = $(true);
$(`a`);
if (x$7 < 0) {
  $(`b`);
  x$7 ** 0;
  $(`d`);
  $(`e`);
  $(`g`);
} else {
  $(`f`);
  $(`g`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = a < 0;
if (b) {
  a ** 0;
  $( "b" );
}
else {
  $( "c" );
}
const c = $( true );
const d = c < 0;
const e = c < 0;
c ** 0;
if (d) {
  $( "a", e, false );
  c ** 0;
  c ** 0;
  $( "c", true, false );
}
else {
  $( "d", e, false );
}
const f = $( true );
const g = f < 0;
if (g) {
  $( "a" );
  f ** 0;
  $( "c" );
}
else {
  $( "d" );
}
const h = $( true );
const i = h < 0;
if (i) {
  h ** 0;
  $( "b" );
  $( "c" );
}
else {
  $( "d" );
}
const j = $( true );
$( "a" );
const k = j < 0;
if (k) {
  $( "b" );
  j ** 0;
  $( "d" );
  $( "e" );
  $( "g" );
}
else {
  $( "f" );
  $( "g" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const tmpIfTest = x < 0;
if (tmpIfTest) {
  x * 0;
  const tmpIfTest$1 = false;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 < 0;
if (tmpIfTest$3) {
  let tmpCalleeParam = x$1 < 0;
  x$1 * 0;
  let tmpCalleeParam$1 = false;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  x$1 * 0;
  const tmpIfTest$5 = false;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = x$1 < 0;
    x$1 * 0;
    let tmpCalleeParam$5 = false;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = x$1 < 0;
    x$1 * 0;
    let tmpCalleeParam$9 = false;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = x$1 < 0;
  x$1 * 0;
  let tmpCalleeParam$13 = false;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = x$3 < 0;
if (tmpIfTest$7) {
  $(`a`);
  x$3 * 0;
  const tmpIfTest$9 = false;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
const tmpIfTest$11 = x$5 < 0;
if (tmpIfTest$11) {
  x$5 * 0;
  const tmpIfTest$13 = false;
  if (tmpIfTest$13) {
    $(`a`);
    $(`c`);
  } else {
    $(`b`);
    $(`c`);
  }
} else {
  $(`d`);
}
const x$7 = $(true);
$(`a`);
const tmpIfTest$15 = x$7 < 0;
if (tmpIfTest$15) {
  $(`b`);
  x$7 * 0;
  const tmpIfTest$17 = false;
  if (tmpIfTest$17) {
    $(`c`);
    $(`e`);
    $(`g`);
  } else {
    $(`d`);
    $(`e`);
    $(`g`);
  }
} else {
  $(`f`);
  $(`g`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'c'
 - 3: true
 - 4: 'd', false, false
 - 5: true
 - 6: 'd'
 - 7: true
 - 8: 'd'
 - 9: true
 - 10: 'a'
 - 11: 'f'
 - 12: 'g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
