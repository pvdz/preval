# Preval test case

# if_x_eq_1_if_x_gt_nan.md

> If test transitive > Gen > If x eq 1 if x gt nan
>
> if_x_eq_1_if_x_gt_nan

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x === 1) {
    if (x > NaN) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x === 1) {
    $('a', x === 1, x > NaN);
    if (x > NaN) $('b', x === 1, x > NaN);
    else $('c', x === 1, x > NaN);
  }
  else $('d', x === 1, x > NaN);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x === 1) {
    $('a');
    if (x > NaN) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x === 1) {
    if (x > NaN) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x === 1) {
    $('b');
    if (x > NaN) $('c');
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
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  $(`b`);
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
x$1 ** 0;
const tmpIfTest$3 /*:boolean*/ = x$1 === 1;
if (tmpIfTest$3) {
  $(`a`, true, false);
  $(`c`, true, false);
} else {
  $(`d`, false, false);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = x$3 === 1;
if (tmpIfTest$7) {
  $(`a`);
  $(`c`);
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = x$5 === 1;
if (tmpIfTest$11) {
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$15 /*:boolean*/ = x$7 === 1;
if (tmpIfTest$15) {
  $(`b`);
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
if ($(true) === 1) {
  $(`b`);
} else {
  $(`c`);
}
const x$1 = $(true);
x$1 ** 0;
if (x$1 === 1) {
  $(`a`, true, false);
  $(`c`, true, false);
} else {
  $(`d`, false, false);
}
if ($(true) === 1) {
  $(`a`);
  $(`c`);
} else {
  $(`d`);
}
if ($(true) === 1) {
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 = $(true);
$(`a`);
if (x$7 === 1) {
  $(`b`);
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
const b = a === 1;
if (b) {
  $( "b" );
}
else {
  $( "c" );
}
const c = $( true );
c ** 0;
const d = c === 1;
if (d) {
  $( "a", true, false );
  $( "c", true, false );
}
else {
  $( "d", false, false );
}
const e = $( true );
const f = e === 1;
if (f) {
  $( "a" );
  $( "c" );
}
else {
  $( "d" );
}
const g = $( true );
const h = g === 1;
if (h) {
  $( "b" );
  $( "c" );
}
else {
  $( "d" );
}
const i = $( true );
$( "a" );
const j = i === 1;
if (j) {
  $( "b" );
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
const tmpIfTest = x === 1;
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
const tmpIfTest$3 = x$1 === 1;
if (tmpIfTest$3) {
  let tmpCalleeParam = x$1 === 1;
  x$1 * 0;
  let tmpCalleeParam$1 = false;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  x$1 * 0;
  const tmpIfTest$5 = false;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = x$1 === 1;
    x$1 * 0;
    let tmpCalleeParam$5 = false;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = x$1 === 1;
    x$1 * 0;
    let tmpCalleeParam$9 = false;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = x$1 === 1;
  x$1 * 0;
  let tmpCalleeParam$13 = false;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = x$3 === 1;
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
const tmpIfTest$11 = x$5 === 1;
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
const tmpIfTest$15 = x$7 === 1;
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


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
