# Preval test case

# if_1_gte_x_if_nan_lte_x.md

> If test transitive > Gen > If 1 gte x if nan lte x
>
> if_1_gte_x_if_nan_lte_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (1 >= x) {
    if (NaN <= x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (1 >= x) {
    $('a', 1 >= x, NaN <= x);
    if (NaN <= x) $('b', 1 >= x, NaN <= x);
    else $('c', 1 >= x, NaN <= x);
  }
  else $('d', 1 >= x, NaN <= x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (1 >= x) {
    $('a');
    if (NaN <= x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (1 >= x) {
    if (NaN <= x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (1 >= x) {
    $('b');
    if (NaN <= x) $('c');
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
const tmpIfTest /*:boolean*/ = 1 >= x;
if (tmpIfTest) {
  x ** 0;
  $(`b`);
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = 1 >= x$1;
const tmpCalleeParam /*:boolean*/ = 1 >= x$1;
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
const tmpIfTest$7 /*:boolean*/ = 1 >= x$3;
if (tmpIfTest$7) {
  $(`a`);
  x$3 ** 0;
  $(`c`);
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = 1 >= x$5;
if (tmpIfTest$11) {
  x$5 ** 0;
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$15 /*:boolean*/ = 1 >= x$7;
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
if (1 >= x) {
  x ** 0;
  $(`b`);
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = 1 >= x$1;
const tmpCalleeParam = 1 >= x$1;
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
if (1 >= x$3) {
  $(`a`);
  x$3 ** 0;
  $(`c`);
} else {
  $(`d`);
}
const x$5 = $(true);
if (1 >= x$5) {
  x$5 ** 0;
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 = $(true);
$(`a`);
if (1 >= x$7) {
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
const b = 1 >= a;
if (b) {
  a ** 0;
  $( "b" );
}
else {
  $( "c" );
}
const c = $( true );
const d = 1 >= c;
const e = 1 >= c;
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
const g = 1 >= f;
if (g) {
  $( "a" );
  f ** 0;
  $( "c" );
}
else {
  $( "d" );
}
const h = $( true );
const i = 1 >= h;
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
const k = 1 >= j;
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
const tmpIfTest = 1 >= x;
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
const tmpIfTest$3 = 1 >= x$1;
if (tmpIfTest$3) {
  let tmpCalleeParam = 1 >= x$1;
  x$1 * 0;
  let tmpCalleeParam$1 = false;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  x$1 * 0;
  const tmpIfTest$5 = false;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = 1 >= x$1;
    x$1 * 0;
    let tmpCalleeParam$5 = false;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = 1 >= x$1;
    x$1 * 0;
    let tmpCalleeParam$9 = false;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = 1 >= x$1;
  x$1 * 0;
  let tmpCalleeParam$13 = false;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = 1 >= x$3;
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
const tmpIfTest$11 = 1 >= x$5;
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
const tmpIfTest$15 = 1 >= x$7;
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
 - 2: 'b'
 - 3: true
 - 4: 'a', true, false
 - 5: 'c', true, false
 - 6: true
 - 7: 'a'
 - 8: 'c'
 - 9: true
 - 10: 'b'
 - 11: 'c'
 - 12: true
 - 13: 'a'
 - 14: 'b'
 - 15: 'd'
 - 16: 'e'
 - 17: 'g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
