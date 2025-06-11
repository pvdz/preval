# Preval test case

# if_x_gte_0_if_1_lte_x.md

> If test transitive > Gen > If x gte 0 if 1 lte x
>
> if_x_gte_0_if_1_lte_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x >= 0) {
    if (1 <= x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x >= 0) {
    $('a', x >= 0, 1 <= x);
    if (1 <= x) $('b', x >= 0, 1 <= x);
    else $('c', x >= 0, 1 <= x);
  }
  else $('d', x >= 0, 1 <= x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x >= 0) {
    $('a');
    if (1 <= x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x >= 0) {
    if (1 <= x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x >= 0) {
    $('b');
    if (1 <= x) $('c');
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
const tmpIfTest /*:boolean*/ = x >= 0;
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = 1 <= x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = x$1 >= 0;
const tmpCalleeParam /*:boolean*/ = x$1 >= 0;
const tmpCalleeParam$1 /*:boolean*/ = 1 <= x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 /*:boolean*/ = 1 <= x$1;
  const tmpCalleeParam$3 /*:boolean*/ = x$1 >= 0;
  const tmpCalleeParam$5 /*:boolean*/ = 1 <= x$1;
  if (tmpIfTest$5) {
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    $(`c`, tmpCalleeParam$3, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = x$3 >= 0;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 /*:boolean*/ = 1 <= x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = x$5 >= 0;
if (tmpIfTest$11) {
  const tmpIfTest$13 /*:boolean*/ = 1 <= x$5;
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
const tmpIfTest$15 /*:boolean*/ = x$7 >= 0;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 /*:boolean*/ = 1 <= x$7;
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
if (x >= 0) {
  if (1 <= x) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 >= 0;
const tmpCalleeParam = x$1 >= 0;
const tmpCalleeParam$1 = 1 <= x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 1 <= x$1;
  const tmpCalleeParam$3 = x$1 >= 0;
  const tmpCalleeParam$5 = 1 <= x$1;
  if (tmpIfTest$5) {
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    $(`c`, tmpCalleeParam$3, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 = $(true);
if (x$3 >= 0) {
  $(`a`);
  if (1 <= x$3) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
if (x$5 >= 0) {
  if (1 <= x$5) {
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
if (x$7 >= 0) {
  $(`b`);
  if (1 <= x$7) {
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
const b = a >= 0;
if (b) {
  const c = 1 <= a;
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
const e = d >= 0;
const f = d >= 0;
const g = 1 <= d;
if (e) {
  $( "a", f, g );
  const h = 1 <= d;
  const i = d >= 0;
  const j = 1 <= d;
  if (h) {
    $( "b", i, j );
  }
  else {
    $( "c", i, j );
  }
}
else {
  $( "d", f, g );
}
const k = $( true );
const l = k >= 0;
if (l) {
  $( "a" );
  const m = 1 <= k;
  if (m) {
    $( "b" );
  }
  else {
    $( "c" );
  }
}
else {
  $( "d" );
}
const n = $( true );
const o = n >= 0;
if (o) {
  const p = 1 <= n;
  if (p) {
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
const q = $( true );
$( "a" );
const r = q >= 0;
if (r) {
  $( "b" );
  const s = 1 <= q;
  if (s) {
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
const tmpIfTest = x >= 0;
if (tmpIfTest) {
  const tmpIfTest$1 = 1 <= x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 >= 0;
if (tmpIfTest$3) {
  let tmpCalleeParam = x$1 >= 0;
  let tmpCalleeParam$1 = 1 <= x$1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 1 <= x$1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = x$1 >= 0;
    let tmpCalleeParam$5 = 1 <= x$1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = x$1 >= 0;
    let tmpCalleeParam$9 = 1 <= x$1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = x$1 >= 0;
  let tmpCalleeParam$13 = 1 <= x$1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = x$3 >= 0;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = 1 <= x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
const tmpIfTest$11 = x$5 >= 0;
if (tmpIfTest$11) {
  const tmpIfTest$13 = 1 <= x$5;
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
const tmpIfTest$15 = x$7 >= 0;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 = 1 <= x$7;
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
