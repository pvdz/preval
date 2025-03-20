# Preval test case

# base_two_levels_10.md

> Bit hacks > And > Nested if > Nested if spied > Base two levels 10
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = $spy(10);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(10);
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
const x = $spy(10);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 10 );
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
 - 1: 'Creating spy', 1, 1, [10, 10]
 - 2: '$spy[1].valueOf()', 10
 - 3: '$spy[1].valueOf()', 10
 - 4: 'it is ten'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
