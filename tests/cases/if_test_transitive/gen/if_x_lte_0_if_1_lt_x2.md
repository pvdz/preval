# Preval test case

# if_x_lte_0_if_1_lt_x2.md

> If test transitive > Gen > If x lte 0 if 1 lt x2
>
> if_x_lte_0_if_1_lt_x

This particular case triggered a bug in ifHoisting.

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x <= 0) {
    if (1 < x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x <= 0) {
    $('a', x <= 0, 1 < x);
    if (1 < x) $('b', x <= 0, 1 < x);
    else $('c', x <= 0, 1 < x);
  }
  else $('d', x <= 0, 1 < x);
}



{ // Unknown call after inner if
  const x = $(true);
  if (x <= 0) {
    if (1 < x) $('a');
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
    if (1 < x) $('c');
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
  const tmpIfTest$1 /*:boolean*/ = 1 < x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = x$1 <= 0;
const tmpCalleeParam /*:boolean*/ = x$1 <= 0;
const tmpCalleeParam$1 /*:boolean*/ = 1 < x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$2 /*:boolean*/ = 1 < x$1;
  const tmpCalleeParam$5 /*:boolean*/ = 1 < x$1;
  if (tmpIfTest$2) {
    $(`b`, true, tmpCalleeParam$5);
  } else {
    $(`c`, true, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = x$3 <= 0;
if (tmpIfTest$7) {
  const tmpIfTest$9 /*:boolean*/ = 1 < x$3;
  if (tmpIfTest$9) {
    $(`a`);
    $(`c`);
  } else {
    $(`b`);
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$11 /*:boolean*/ = x$5 <= 0;
if (tmpIfTest$11) {
  $(`b`);
  const tmpIfTest$13 /*:boolean*/ = 1 < x$5;
  if (tmpIfTest$13) {
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
if (x <= 0) {
  if (1 < x) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 <= 0;
const tmpCalleeParam = x$1 <= 0;
const tmpCalleeParam$1 = 1 < x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$2 = 1 < x$1;
  const tmpCalleeParam$5 = 1 < x$1;
  if (tmpIfTest$2) {
    $(`b`, true, tmpCalleeParam$5);
  } else {
    $(`c`, true, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 = $(true);
if (x$3 <= 0) {
  if (1 < x$3) {
    $(`a`);
    $(`c`);
  } else {
    $(`b`);
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
$(`a`);
if (x$5 <= 0) {
  $(`b`);
  if (1 < x$5) {
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


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = a <= 0;
if (b) {
  const c = 1 < a;
  if (c) {
    $( "a" );
  }
  else {
    $( "b" );
  }
}
else {
  $( "c" );
}
const d = $( true );
const e = d <= 0;
const f = d <= 0;
const g = 1 < d;
if (e) {
  $( "a", f, g );
  const h = 1 < d;
  const i = 1 < d;
  if (h) {
    $( "b", true, i );
  }
  else {
    $( "c", true, i );
  }
}
else {
  $( "d", f, g );
}
const j = $( true );
const k = j <= 0;
if (k) {
  const l = 1 < j;
  if (l) {
    $( "a" );
    $( "c" );
  }
  else {
    $( "b" );
    $( "c" );
  }
}
else {
  $( "d" );
}
const m = $( true );
$( "a" );
const n = m <= 0;
if (n) {
  $( "b" );
  const o = 1 < m;
  if (o) {
    $( "c" );
    $( "e" );
    $( "g" );
  }
  else {
    $( "d" );
    $( "e" );
    $( "g" );
  }
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
  const tmpIfTest$1 = 1 < x;
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
  let tmpCalleeParam$1 = 1 < x$1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 1 < x$1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = x$1 <= 0;
    let tmpCalleeParam$5 = 1 < x$1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = x$1 <= 0;
    let tmpCalleeParam$9 = 1 < x$1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = x$1 <= 0;
  let tmpCalleeParam$13 = 1 < x$1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = x$3 <= 0;
if (tmpIfTest$7) {
  const tmpIfTest$9 = 1 < x$3;
  if (tmpIfTest$9) {
    $(`a`);
    $(`c`);
  } else {
    $(`b`);
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
$(`a`);
const tmpIfTest$11 = x$5 <= 0;
if (tmpIfTest$11) {
  $(`b`);
  const tmpIfTest$13 = 1 < x$5;
  if (tmpIfTest$13) {
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
 - 8: 'a'
 - 9: 'f'
 - 10: 'g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
