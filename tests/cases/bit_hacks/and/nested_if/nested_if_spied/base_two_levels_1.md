# Preval test case

# base_two_levels_1.md

> Bit hacks > And > Nested if > Nested if spied > Base two levels 1
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = $spy(1);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(1);
const tmpIfTest /*:number*/ /*&8*/ /*oneBitAnded*/ = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 /*:number*/ /*&2*/ /*oneBitAnded*/ = x & 2;
  if (tmpIfTest$1) {
    $(`it is ten`);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(1);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 1 );
const b = a & 8;
if (b) {
  const c = a & 2;
  if (c) {
    $( "it is ten" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(1);
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    $(`it is ten`);
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
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
