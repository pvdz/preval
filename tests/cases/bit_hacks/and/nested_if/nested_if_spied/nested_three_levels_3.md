# Preval test case

# nested_three_levels_3.md

> Bit hacks > And > Nested if > Nested if spied > Nested three levels 3
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 7-way options in a Set.

Something like `new Set([2, 8, 10, 32, 34, 40, 42]).has(n)`

## Input

`````js filename=intro
const x = $spy(3);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      $('it is 42');
    }
  }
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(3);
const tmpIfTest /*:number*/ /*&8*/ /*oneBitAnded*/ = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 /*:number*/ /*&2*/ /*oneBitAnded*/ = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 /*:number*/ /*&32*/ /*oneBitAnded*/ = x & 32;
    if (tmpIfTest$3) {
      $(`it is 42`);
    } else {
    }
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(3);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      $(`it is 42`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 3 );
const b = a & 8;
if (b) {
  const c = a & 2;
  if (c) {
    const d = a & 32;
    if (d) {
      $( "it is 42" );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(3);
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 = x & 32;
    if (tmpIfTest$3) {
      $(`it is 42`);
    } else {
    }
  } else {
  }
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [3, 3]
 - 2: '$spy[1].valueOf()', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
