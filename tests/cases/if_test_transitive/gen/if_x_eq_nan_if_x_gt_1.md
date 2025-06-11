# Preval test case

# if_x_eq_nan_if_x_gt_1.md

> If test transitive > Gen > If x eq nan if x gt 1
>
> if_x_eq_nan_if_x_gt_1

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x === NaN) {
    if (x > 1) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x === NaN) {
    $('a', x === NaN, x > 1);
    if (x > 1) $('b', x === NaN, x > 1);
    else $('c', x === NaN, x > 1);
  }
  else $('d', x === NaN, x > 1);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x === NaN) {
    $('a');
    if (x > 1) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x === NaN) {
    if (x > 1) $('a');
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
    if (x > 1) $('c');
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
const tmpCalleeParam$1 /*:boolean*/ = x$1 > 1;
$(`d`, false, tmpCalleeParam$1);
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
$(`d`, false, $(true) > 1);
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
const b = a > 1;
$( "d", false, b );
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
  const tmpIfTest$1 = x > 1;
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
  let tmpCalleeParam$1 = x$1 > 1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = x$1 > 1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = false;
    let tmpCalleeParam$5 = x$1 > 1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = false;
    let tmpCalleeParam$9 = x$1 > 1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = false;
  let tmpCalleeParam$13 = x$1 > 1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = false;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = x$3 > 1;
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
  const tmpIfTest$13 = x$5 > 1;
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
  const tmpIfTest$17 = x$7 > 1;
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
