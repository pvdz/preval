# Preval test case

# base_two_levels_8.md

> Bit hacks > And > Nested if > Nested if spied > Base two levels 8
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = $spy(8);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(8);
const tmpIfTest /*:number*/ = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 /*:number*/ = x & 2;
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
const x = $spy(8);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 8 );
const b = a & 8;
if (b) {
  const c = a & 2;
  if (c) {
    $( "it is ten" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [8, 8]
 - 2: '$spy[1].valueOf()', 8
 - 3: '$spy[1].valueOf()', 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
