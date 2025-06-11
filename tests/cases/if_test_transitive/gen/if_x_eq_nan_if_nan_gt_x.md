# Preval test case

# if_x_eq_nan_if_nan_gt_x.md

> If test transitive > Gen > If x eq nan if nan gt x
>
> if_x_eq_nan_if_nan_gt_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x === NaN) {
    if (NaN > x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x === NaN) {
    $('a', x === NaN, NaN > x);
    if (NaN > x) $('b', x === NaN, NaN > x);
    else $('c', x === NaN, NaN > x);
  }
  else $('d', x === NaN, NaN > x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x === NaN) {
    $('a');
    if (NaN > x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x === NaN) {
    if (NaN > x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x === NaN) {
    $('b');
    if (NaN > x) $('c');
    else $('d');
    $('e');
  }
  else $('f');
  $('g');
}
`````


## Settled


`````js filename=intro
$(true);
$(`c`);
const x$1 /*:unknown*/ = $(true);
x$1 ** 0;
$(`d`, false, false);
$(true);
$(`d`);
$(true);
$(`d`);
$(true);
$(`a`);
$(`f`);
$(`g`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`c`);
$(true) ** 0;
$(`d`, false, false);
$(true);
$(`d`);
$(true);
$(`d`);
$(true);
$(`a`);
$(`f`);
$(`g`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "c" );
const a = $( true );
a ** 0;
$( "d", false, false );
$( true );
$( "d" );
$( true );
$( "d" );
$( true );
$( "a" );
$( "f" );
$( "g" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const tmpIfTest = false;
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
const tmpIfTest$3 = false;
if (tmpIfTest$3) {
  let tmpCalleeParam = false;
  x$1 * 0;
  let tmpCalleeParam$1 = false;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  x$1 * 0;
  const tmpIfTest$5 = false;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = false;
    x$1 * 0;
    let tmpCalleeParam$5 = false;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = false;
    x$1 * 0;
    let tmpCalleeParam$9 = false;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = false;
  x$1 * 0;
  let tmpCalleeParam$13 = false;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = false;
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
const tmpIfTest$11 = false;
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
const tmpIfTest$15 = false;
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
