# Preval test case

# if_x_gte_nan_if_x_gte_1.md

> If test transitive > Gen > If x gte nan if x gte 1
>
> if_x_gte_nan_if_x_gte_1

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x >= NaN) {
    if (x >= 1) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x >= NaN) {
    $('a', x >= NaN, x >= 1);
    if (x >= 1) $('b', x >= NaN, x >= 1);
    else $('c', x >= NaN, x >= 1);
  }
  else $('d', x >= NaN, x >= 1);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x >= NaN) {
    $('a');
    if (x >= 1) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x >= NaN) {
    if (x >= 1) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x >= NaN) {
    $('b');
    if (x >= 1) $('c');
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
x ** 0;
$(`c`);
const x$1 /*:unknown*/ = $(true);
x$1 ** 0;
x$1 ** 0;
const tmpCalleeParam$1 /*:boolean*/ = x$1 >= 1;
$(`d`, false, tmpCalleeParam$1);
const x$3 /*:unknown*/ = $(true);
x$3 ** 0;
$(`d`);
const x$5 /*:unknown*/ = $(true);
x$5 ** 0;
$(`d`);
const x$7 /*:unknown*/ = $(true);
$(`a`);
x$7 ** 0;
$(`f`);
$(`g`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true) ** 0;
$(`c`);
const x$1 = $(true);
x$1 ** 0;
x$1 ** 0;
$(`d`, false, x$1 >= 1);
$(true) ** 0;
$(`d`);
$(true) ** 0;
$(`d`);
const x$7 = $(true);
$(`a`);
x$7 ** 0;
$(`f`);
$(`g`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
a ** 0;
$( "c" );
const b = $( true );
b ** 0;
b ** 0;
const c = b >= 1;
$( "d", false, c );
const d = $( true );
d ** 0;
$( "d" );
const e = $( true );
e ** 0;
$( "d" );
const f = $( true );
$( "a" );
f ** 0;
$( "f" );
$( "g" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
x * 0;
const tmpIfTest = false;
if (tmpIfTest) {
  const tmpIfTest$1 = x >= 1;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
x$1 * 0;
const tmpIfTest$3 = false;
if (tmpIfTest$3) {
  x$1 * 0;
  let tmpCalleeParam = false;
  let tmpCalleeParam$1 = x$1 >= 1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = x$1 >= 1;
  if (tmpIfTest$5) {
    x$1 * 0;
    let tmpCalleeParam$3 = false;
    let tmpCalleeParam$5 = x$1 >= 1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    x$1 * 0;
    let tmpCalleeParam$7 = false;
    let tmpCalleeParam$9 = x$1 >= 1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  x$1 * 0;
  let tmpCalleeParam$11 = false;
  let tmpCalleeParam$13 = x$1 >= 1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
x$3 * 0;
const tmpIfTest$7 = false;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = x$3 >= 1;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
x$5 * 0;
const tmpIfTest$11 = false;
if (tmpIfTest$11) {
  const tmpIfTest$13 = x$5 >= 1;
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
x$7 * 0;
const tmpIfTest$15 = false;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 = x$7 >= 1;
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
 - 4: 'd', false, true
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
