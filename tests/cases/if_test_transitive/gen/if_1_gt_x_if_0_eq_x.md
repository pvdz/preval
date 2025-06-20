# Preval test case

# if_1_gt_x_if_0_eq_x.md

> If test transitive > Gen > If 1 gt x if 0 eq x
>
> if_1_gt_x_if_0_eq_x

## Input

`````js filename=intro
{ // Simplest form
  const x = $(true);
  if (1 > x) {
    if (0 === x) $('a');
    else $('b');
  }
  else $('c');
}


{ // As expr too
  const x = $(true);
  if (1 > x) {
    $('a', 1 > x, 0 === x);
    if (0 === x) $('b', 1 > x, 0 === x);
    else $('c', 1 > x, 0 === x);
  }
  else $('d', 1 > x, 0 === x);
}


{ // Unknown call before inner if
  const x = $(true);
  if (1 > x) {
    $('a');
    if (0 === x) $('b');
    else $('c');
  }
  else $('d');
}


{ // Unknown call after inner if
  const x = $(true);
  if (1 > x) {
    if (0 === x) $('a');
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
    if (0 === x) $('c');
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
  const tmpIfTest$1 /*:boolean*/ = 0 === x;
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
const tmpCalleeParam$1 /*:boolean*/ = 0 === x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$2 /*:boolean*/ = 0 === x$1;
  if (tmpIfTest$2) {
    $(`b`, true, true);
  } else {
    $(`c`, true, false);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 /*:unknown*/ = $(true);
const tmpIfTest$7 /*:boolean*/ = 1 > x$3;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 /*:boolean*/ = 0 === x$3;
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
  const tmpIfTest$13 /*:boolean*/ = 0 === x$5;
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
  const tmpIfTest$17 /*:boolean*/ = 0 === x$7;
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
  if (0 === x) {
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
const tmpCalleeParam$1 = 0 === x$1;
if (tmpIfTest$3) {
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  if (0 === x$1) {
    $(`b`, true, true);
  } else {
    $(`c`, true, false);
  }
} else {
  $(`d`, tmpCalleeParam, tmpCalleeParam$1);
}
const x$3 = $(true);
if (1 > x$3) {
  $(`a`);
  if (0 === x$3) {
    $(`b`);
  } else {
    $(`c`);
  }
} else {
  $(`d`);
}
const x$5 = $(true);
if (1 > x$5) {
  if (0 === x$5) {
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
  if (0 === x$7) {
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
  const c = 0 === a;
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
const g = 0 === d;
if (e) {
  $( "a", f, g );
  const h = 0 === d;
  if (h) {
    $( "b", true, true );
  }
  else {
    $( "c", true, false );
  }
}
else {
  $( "d", f, g );
}
const i = $( true );
const j = 1 > i;
if (j) {
  $( "a" );
  const k = 0 === i;
  if (k) {
    $( "b" );
  }
  else {
    $( "c" );
  }
}
else {
  $( "d" );
}
const l = $( true );
const m = 1 > l;
if (m) {
  const n = 0 === l;
  if (n) {
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
const o = $( true );
$( "a" );
const p = 1 > o;
if (p) {
  $( "b" );
  const q = 0 === o;
  if (q) {
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
  const tmpIfTest$1 = 0 === x;
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
  let tmpCalleeParam$1 = 0 === x$1;
  $(`a`, tmpCalleeParam, tmpCalleeParam$1);
  const tmpIfTest$5 = 0 === x$1;
  if (tmpIfTest$5) {
    let tmpCalleeParam$3 = 1 > x$1;
    let tmpCalleeParam$5 = 0 === x$1;
    $(`b`, tmpCalleeParam$3, tmpCalleeParam$5);
  } else {
    let tmpCalleeParam$7 = 1 > x$1;
    let tmpCalleeParam$9 = 0 === x$1;
    $(`c`, tmpCalleeParam$7, tmpCalleeParam$9);
  }
} else {
  let tmpCalleeParam$11 = 1 > x$1;
  let tmpCalleeParam$13 = 0 === x$1;
  $(`d`, tmpCalleeParam$11, tmpCalleeParam$13);
}
const x$3 = $(true);
const tmpIfTest$7 = 1 > x$3;
if (tmpIfTest$7) {
  $(`a`);
  const tmpIfTest$9 = 0 === x$3;
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
  const tmpIfTest$13 = 0 === x$5;
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
  const tmpIfTest$17 = 0 === x$7;
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
