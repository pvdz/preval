# Preval test case

# if_0_eq_x_if_0_lt_x.md

> If test transitive > Gen > If 0 eq x if 0 lt x
>
> if_0_eq_x_if_0_lt_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (0 === x) {
    if (0 < x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (0 === x) {
    $('a', 0 === x, 0 < x);
    if (0 < x) $('b', 0 === x, 0 < x);
    else $('c', 0 === x, 0 < x);
  }
  else $('d', 0 === x, 0 < x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (0 === x) {
    $('a');
    if (0 < x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (0 === x) {
    if (0 < x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (0 === x) {
    $('b');
    if (0 < x) $('c');
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
const tmpIfTest /*:boolean*/ = 0 === x;
if (tmpIfTest) {
  $(`b`);
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpCalleeParam$1 /*:boolean*/ = 0 < x$1;
const tmpIfTest$3 /*:boolean*/ = 0 === x$1;
if (tmpIfTest$3) {
  $(`a`, true, tmpCalleeParam$1);
  $(`c`, true, false);
} else {
  $(`d`, false, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = 0 === x$3;
if (tmpIfTest$7) {
  $(`a`);
  $(`c`);
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = 0 === x$5;
if (tmpIfTest$11) {
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$15 /*:boolean*/ = 0 === x$7;
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
const x = $(true);
if (0 === x) {
  $(`b`);
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpCalleeParam$1 = 0 < x$1;
if (0 === x$1) {
  $(`a`, true, tmpCalleeParam$1);
  $(`c`, true, false);
} else {
  $(`d`, false, tmpCalleeParam$1);
}
const x$3 = $(true);
if (0 === x$3) {
  $(`a`);
  $(`c`);
} else {
  $(`d`);
}
const x$5 = $(true);
if (0 === x$5) {
  $(`b`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 = $(true);
$(`a`);
if (0 === x$7) {
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
const b = 0 === a;
if (b) {
  $( "b" );
}
else {
  $( "c" );
}
const c = $( true );
const d = 0 < c;
const e = 0 === c;
if (e) {
  $( "a", true, d );
  $( "c", true, false );
}
else {
  $( "d", false, d );
}
const f = $( true );
const g = 0 === f;
if (g) {
  $( "a" );
  $( "c" );
}
else {
  $( "d" );
}
const h = $( true );
const i = 0 === h;
if (i) {
  $( "b" );
  $( "c" );
}
else {
  $( "d" );
}
const j = $( true );
$( "a" );
const k = 0 === j;
if (k) {
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
const tmpIfTest = 0 === x;
if (tmpIfTest) {
  const tmpIfTest$1 = 0 < x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = 0 === x$1;
if (tmpIfTest$3) {
  let tmpCalleeParam = 0 === x$1;
  let tmpCalleeParam$1 = 0 < x$1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 0 < x$1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = 0 === x$1;
    let tmpCalleeParam$5 = 0 < x$1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = 0 === x$1;
    let tmpCalleeParam$9 = 0 < x$1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = 0 === x$1;
  let tmpCalleeParam$13 = 0 < x$1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = 0 === x$3;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = 0 < x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
const tmpIfTest$11 = 0 === x$5;
if (tmpIfTest$11) {
  const tmpIfTest$13 = 0 < x$5;
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
const tmpIfTest$15 = 0 === x$7;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 = 0 < x$7;
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
