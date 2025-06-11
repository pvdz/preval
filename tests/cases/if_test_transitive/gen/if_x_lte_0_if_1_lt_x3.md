# Preval test case

# if_x_lte_0_if_1_lt_x3.md

> If test transitive > Gen > If x lte 0 if 1 lt x3
>
> if_x_lte_0_if_1_lt_x

This particular minimal case triggered a bug in ifHoisting.
(It must depend on rule order because the first `if` is dead but necessary)

## Input

`````js filename=intro
const x = $(true);
if (1 < x) ;

const x2 = $(true);
if (x2 <= 0) {
  $('a', x2 <= 0);
  if (1 < x2) $('b', x2 <= 0);
  else $('c', x2 <= 0);
}
else $('d', x2 <= 0);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
x ** 0;
const x2 /*:unknown*/ = $(true);
const tmpIfTest$1 /*:boolean*/ = x2 <= 0;
const tmpCalleeParam /*:boolean*/ = x2 <= 0;
if (tmpIfTest$1) {
  $(`a`, tmpCalleeParam);
  const tmpIfTest$3 /*:boolean*/ = 1 < x2;
  if (tmpIfTest$3) {
    $(`b`, true);
  } else {
    $(`c`, true);
  }
} else {
  $(`d`, tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true) ** 0;
const x2 = $(true);
const tmpIfTest$1 = x2 <= 0;
const tmpCalleeParam = x2 <= 0;
if (tmpIfTest$1) {
  $(`a`, tmpCalleeParam);
  if (1 < x2) {
    $(`b`, true);
  } else {
    $(`c`, true);
  }
} else {
  $(`d`, tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
a ** 0;
const b = $( true );
const c = b <= 0;
const d = b <= 0;
if (c) {
  $( "a", d );
  const e = 1 < b;
  if (e) {
    $( "b", true );
  }
  else {
    $( "c", true );
  }
}
else {
  $( "d", d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const tmpIfTest = 1 < x;
const x2 = $(true);
const tmpIfTest$1 = x2 <= 0;
if (tmpIfTest$1) {
  let tmpCalleeParam = x2 <= 0;
  $(`a`, tmpCalleeParam);
  const tmpIfTest$3 = 1 < x2;
  if (tmpIfTest$3) {
    let tmpCalleeParam$1 = x2 <= 0;
    $(`b`, tmpCalleeParam$1);
  } else {
    let tmpCalleeParam$3 = x2 <= 0;
    $(`c`, tmpCalleeParam$3);
  }
} else {
  let tmpCalleeParam$5 = x2 <= 0;
  $(`d`, tmpCalleeParam$5);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'd', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
