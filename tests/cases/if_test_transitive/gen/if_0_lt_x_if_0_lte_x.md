# Preval test case

# if_0_lt_x_if_0_lte_x.md

> If test transitive > Gen > If 0 lt x if 0 lte x
>
> if_0_lt_x_if_0_lte_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (0 < x) {
    if (0 <= x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (0 < x) {
    $('a', 0 < x, 0 <= x);
    if (0 <= x) $('b', 0 < x, 0 <= x);
    else $('c', 0 < x, 0 <= x);
  }
  else $('d', 0 < x, 0 <= x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (0 < x) {
    $('a');
    if (0 <= x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (0 < x) {
    if (0 <= x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (0 < x) {
    $('b');
    if (0 <= x) $('c');
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
const tmpIfTest /*:boolean*/ = 0 < x;
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = 0 <= x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = 0 < x$1;
const tmpCalleeParam /*:boolean*/ = 0 < x$1;
const tmpCalleeParam$1 /*:boolean*/ = 0 <= x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$2 /*:boolean*/ = 0 <= x$1;
  const tmpCalleeParam$5 /*:boolean*/ = 0 <= x$1;
  if (tmpIfTest$2) {
    $(`b`, true, tmpCalleeParam$5);
  } else {
    $(`c`, true, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = 0 < x$3;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 /*:boolean*/ = 0 <= x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = 0 < x$5;
if (tmpIfTest$11) {
  const tmpIfTest$13 /*:boolean*/ = 0 <= x$5;
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
const x$7 /*:unknown*/ = $(true);
$(`a`);
const tmpIfTest$15 /*:boolean*/ = 0 < x$7;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 /*:boolean*/ = 0 <= x$7;
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
if (0 < x) {
  if (0 <= x) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = 0 < x$1;
const tmpCalleeParam = 0 < x$1;
const tmpCalleeParam$1 = 0 <= x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$2 = 0 <= x$1;
  const tmpCalleeParam$5 = 0 <= x$1;
  if (tmpIfTest$2) {
    $(`b`, true, tmpCalleeParam$5);
  } else {
    $(`c`, true, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 = $(true);
if (0 < x$3) {
  $(`a`);
  if (0 <= x$3) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
if (0 < x$5) {
  if (0 <= x$5) {
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
if (0 < x$7) {
  $(`b`);
  if (0 <= x$7) {
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
const b = 0 < a;
if (b) {
  const c = 0 <= a;
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
const e = 0 < d;
const f = 0 < d;
const g = 0 <= d;
if (e) {
  $( "a", f, g );
  const h = 0 <= d;
  const i = 0 <= d;
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
const k = 0 < j;
if (k) {
  $( "a" );
  const l = 0 <= j;
  if (l) {
    $( "b" );
  }
  else {
    $( "c" );
  }
}
else {
  $( "d" );
}
const m = $( true );
const n = 0 < m;
if (n) {
  const o = 0 <= m;
  if (o) {
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
const p = $( true );
$( "a" );
const q = 0 < p;
if (q) {
  $( "b" );
  const r = 0 <= p;
  if (r) {
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
const tmpIfTest = 0 < x;
if (tmpIfTest) {
  const tmpIfTest$1 = 0 <= x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = 0 < x$1;
if (tmpIfTest$3) {
  let tmpCalleeParam = 0 < x$1;
  let tmpCalleeParam$1 = 0 <= x$1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 0 <= x$1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = 0 < x$1;
    let tmpCalleeParam$5 = 0 <= x$1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = 0 < x$1;
    let tmpCalleeParam$9 = 0 <= x$1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = 0 < x$1;
  let tmpCalleeParam$13 = 0 <= x$1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = 0 < x$3;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = 0 <= x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
const tmpIfTest$11 = 0 < x$5;
if (tmpIfTest$11) {
  const tmpIfTest$13 = 0 <= x$5;
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
const tmpIfTest$15 = 0 < x$7;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 = 0 <= x$7;
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
 - 2: 'a'
 - 3: true
 - 4: 'a', true, true
 - 5: 'b', true, true
 - 6: true
 - 7: 'a'
 - 8: 'b'
 - 9: true
 - 10: 'a'
 - 11: 'c'
 - 12: true
 - 13: 'a'
 - 14: 'b'
 - 15: 'c'
 - 16: 'e'
 - 17: 'g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
