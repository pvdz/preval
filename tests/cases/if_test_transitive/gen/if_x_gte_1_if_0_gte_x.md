# Preval test case

# if_x_gte_1_if_0_gte_x.md

> If test transitive > Gen > If x gte 1 if 0 gte x
>
> if_x_gte_1_if_0_gte_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (x >= 1) {
    if (0 >= x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (x >= 1) {
    $('a', x >= 1, 0 >= x);
    if (0 >= x) $('b', x >= 1, 0 >= x);
    else $('c', x >= 1, 0 >= x);
  }
  else $('d', x >= 1, 0 >= x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (x >= 1) {
    $('a');
    if (0 >= x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (x >= 1) {
    if (0 >= x) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (x >= 1) {
    $('b');
    if (0 >= x) $('c');
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
const tmpIfTest /*:boolean*/ = x >= 1;
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = 0 >= x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = x$1 >= 1;
const tmpCalleeParam /*:boolean*/ = x$1 >= 1;
const tmpCalleeParam$1 /*:boolean*/ = 0 >= x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 /*:boolean*/ = 0 >= x$1;
  const tmpCalleeParam$3 /*:boolean*/ = x$1 >= 1;
  const tmpCalleeParam$5 /*:boolean*/ = 0 >= x$1;
  if (tmpIfTest$5) {
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    $(`c`, tmpCalleeParam$3, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = x$3 >= 1;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 /*:boolean*/ = 0 >= x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = x$5 >= 1;
if (tmpIfTest$11) {
  const tmpIfTest$13 /*:boolean*/ = 0 >= x$5;
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
const tmpIfTest$15 /*:boolean*/ = x$7 >= 1;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 /*:boolean*/ = 0 >= x$7;
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
if (x >= 1) {
  if (0 >= x) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 >= 1;
const tmpCalleeParam = x$1 >= 1;
const tmpCalleeParam$1 = 0 >= x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 0 >= x$1;
  const tmpCalleeParam$3 = x$1 >= 1;
  const tmpCalleeParam$5 = 0 >= x$1;
  if (tmpIfTest$5) {
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    $(`c`, tmpCalleeParam$3, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 = $(true);
if (x$3 >= 1) {
  $(`a`);
  if (0 >= x$3) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
if (x$5 >= 1) {
  if (0 >= x$5) {
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
if (x$7 >= 1) {
  $(`b`);
  if (0 >= x$7) {
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
const b = a >= 1;
if (b) {
  const c = 0 >= a;
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
const e = d >= 1;
const f = d >= 1;
const g = 0 >= d;
if (e) {
  $( "a", f, g );
  const h = 0 >= d;
  const i = d >= 1;
  const j = 0 >= d;
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
const l = k >= 1;
if (l) {
  $( "a" );
  const m = 0 >= k;
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
const o = n >= 1;
if (o) {
  const p = 0 >= n;
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
const r = q >= 1;
if (r) {
  $( "b" );
  const s = 0 >= q;
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
const tmpIfTest = x >= 1;
if (tmpIfTest) {
  const tmpIfTest$1 = 0 >= x;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = x$1 >= 1;
if (tmpIfTest$3) {
  let tmpCalleeParam = x$1 >= 1;
  let tmpCalleeParam$1 = 0 >= x$1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 0 >= x$1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = x$1 >= 1;
    let tmpCalleeParam$5 = 0 >= x$1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = x$1 >= 1;
    let tmpCalleeParam$9 = 0 >= x$1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = x$1 >= 1;
  let tmpCalleeParam$13 = 0 >= x$1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = x$3 >= 1;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = 0 >= x$3;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
const tmpIfTest$11 = x$5 >= 1;
if (tmpIfTest$11) {
  const tmpIfTest$13 = 0 >= x$5;
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
const tmpIfTest$15 = x$7 >= 1;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 = 0 >= x$7;
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
