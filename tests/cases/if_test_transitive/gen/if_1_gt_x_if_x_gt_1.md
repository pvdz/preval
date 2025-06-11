# Preval test case

# if_1_gt_x_if_x_gt_1.md

> If test transitive > Gen > If 1 gt x if x gt 1
>
> if_1_gt_x_if_x_gt_1

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (1 > x) {
    if (x > 1) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (1 > x) {
    $('a', 1 > x, x > 1);
    if (x > 1) $('b', 1 > x, x > 1);
    else $('c', 1 > x, x > 1);
  }
  else $('d', 1 > x, x > 1);
}


{ // Unknown call before inner if
  const x = $(true);
  if (1 > x) {
    $('a');
    if (x > 1) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (1 > x) {
    if (x > 1) $('a');
    else $('b');
    $('c');
  }
  else $('d');
}


{ // Unknown calls everywhere
  const x = $(true);
  $('a');
  if (1 > x) {
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
const x /*:unknown*/ = $(true);
const tmpIfTest /*:boolean*/ = 1 > x;
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = x > 1;
  if (tmpIfTest$1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 /*:unknown*/ = $(true);
const tmpIfTest$3 /*:boolean*/ = 1 > x$1;
const tmpCalleeParam /*:boolean*/ = 1 > x$1;
const tmpCalleeParam$1 /*:boolean*/ = x$1 > 1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 /*:boolean*/ = x$1 > 1;
  const tmpCalleeParam$3 /*:boolean*/ = 1 > x$1;
  const tmpCalleeParam$5 /*:boolean*/ = x$1 > 1;
  if (tmpIfTest$5) {
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    $(`c`, tmpCalleeParam$3, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = 1 > x$3;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 /*:boolean*/ = x$3 > 1;
  if (tmpIfTest$9) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 /*:unknown*/ = $(true);
const tmpIfTest$11 /*:boolean*/ = 1 > x$5;
if (tmpIfTest$11) {
  const tmpIfTest$13 /*:boolean*/ = x$5 > 1;
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
const tmpIfTest$15 /*:boolean*/ = 1 > x$7;
if (tmpIfTest$15) {
  $(`b`);
  const tmpIfTest$17 /*:boolean*/ = x$7 > 1;
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
if (1 > x) {
  if (x > 1) {
    $(`a`);
  } else {
    $(`b`);
  }
} else {
  $(`c`);
}
const x$1 = $(true);
const tmpIfTest$3 = 1 > x$1;
const tmpCalleeParam = 1 > x$1;
const tmpCalleeParam$1 = x$1 > 1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = x$1 > 1;
  const tmpCalleeParam$3 = 1 > x$1;
  const tmpCalleeParam$5 = x$1 > 1;
  if (tmpIfTest$5) {
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    $(`c`, tmpCalleeParam$3, tmpCalleeParam$5);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 = $(true);
if (1 > x$3) {
  $(`a`);
  if (x$3 > 1) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
if (1 > x$5) {
  if (x$5 > 1) {
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
if (1 > x$7) {
  $(`b`);
  if (x$7 > 1) {
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
const b = 1 > a;
if (b) {
  const c = a > 1;
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
const e = 1 > d;
const f = 1 > d;
const g = d > 1;
if (e) {
  $( "a", f, g );
  const h = d > 1;
  const i = 1 > d;
  const j = d > 1;
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
const l = 1 > k;
if (l) {
  $( "a" );
  const m = k > 1;
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
const o = 1 > n;
if (o) {
  const p = n > 1;
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
const r = 1 > q;
if (r) {
  $( "b" );
  const s = q > 1;
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
const tmpIfTest = 1 > x;
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
const tmpIfTest$3 = 1 > x$1;
if (tmpIfTest$3) {
  let tmpCalleeParam = 1 > x$1;
  let tmpCalleeParam$1 = x$1 > 1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = x$1 > 1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = 1 > x$1;
    let tmpCalleeParam$5 = x$1 > 1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = 1 > x$1;
    let tmpCalleeParam$9 = x$1 > 1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = 1 > x$1;
  let tmpCalleeParam$13 = x$1 > 1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = 1 > x$3;
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
const tmpIfTest$11 = 1 > x$5;
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
const tmpIfTest$15 = 1 > x$7;
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
