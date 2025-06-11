# Preval test case

# if_x_lte_0_if_x_lte_1.md

> If test transitive > Gen > If x lte 0 if x lte 1
>
> if_x_lte_0_if_x_lte_1

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x <= 0) {
    if (x <= 1) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x <= 0) {
    $('a', x <= 0, x <= 1);
    if (x <= 1) $('b', x <= 0, x <= 1);
    else $('c', x <= 0, x <= 1);
  }
  else $('d', x <= 0, x <= 1);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x <= 0) {
    $('a');
    if (x <= 1) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x <= 0) {
    if (x <= 1) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x <= 0) {
    $('b');
    if (x <= 1) $('c');
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
const tmpIfTest /*:boolean*/ = x <= 0;
if (tmpIfTest) {
  $(`a`);
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = x$1 <= 0;
const tmpCalleeParam /*:boolean*/ = x$1 <= 0;
const tmpCalleeParam$1 /*:boolean*/ = x$1 <= 1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  $(`b`, true, true);
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = x$3 <= 0;
if (tmpIfTest$7) {
  $(`a`);
  $(`b`);
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = x$5 <= 0;
if (tmpIfTest$11) {
  $(`a`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$15 /*:boolean*/ = x$7 <= 0;
if (tmpIfTest$15) {
  $(`b`);
  $(`c`);
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
if ($(true) <= 0) {
  $(`a`);
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 <= 0;
const tmpCalleeParam = x$1 <= 0;
const tmpCalleeParam$1 = x$1 <= 1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  $(`b`, true, true);
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
if ($(true) <= 0) {
  $(`a`);
  $(`b`);
} else {
  $(`d`);
}
if ($(true) <= 0) {
  $(`a`);
  $(`c`);
} else {
  $(`d`);
}
const x$7 = $(true);
$(`a`);
if (x$7 <= 0) {
  $(`b`);
  $(`c`);
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
const b = a <= 0;
if (b) {
  $( "a" );
}
else {
  $( "c" );
}
const c = $( true );
const d = c <= 0;
const e = c <= 0;
const f = c <= 1;
if (d) {
  $( "a", e, f );
  $( "b", true, true );
}
else {
  $( "d", e, f );
}
const g = $( true );
const h = g <= 0;
if (h) {
  $( "a" );
  $( "b" );
}
else {
  $( "d" );
}
const i = $( true );
const j = i <= 0;
if (j) {
  $( "a" );
  $( "c" );
}
else {
  $( "d" );
}
const k = $( true );
$( "a" );
const l = k <= 0;
if (l) {
  $( "b" );
  $( "c" );
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
const tmpIfTest = x <= 0;
if (tmpIfTest) {
  const tmpIfTest$1 = x <= 1;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 <= 0;
if (tmpIfTest$3) {
  let tmpCalleeParam = x$1 <= 0;
  let tmpCalleeParam$1 = x$1 <= 1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = x$1 <= 1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = x$1 <= 0;
    let tmpCalleeParam$5 = x$1 <= 1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = x$1 <= 0;
    let tmpCalleeParam$9 = x$1 <= 1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = x$1 <= 0;
  let tmpCalleeParam$13 = x$1 <= 1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = x$3 <= 0;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = x$3 <= 1;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
const tmpIfTest$11 = x$5 <= 0;
if (tmpIfTest$11) {
  const tmpIfTest$13 = x$5 <= 1;
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
const tmpIfTest$15 = x$7 <= 0;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 = x$7 <= 1;
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
