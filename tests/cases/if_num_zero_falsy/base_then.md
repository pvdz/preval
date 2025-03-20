# Preval test case

# base_then.md

> If num zero falsy > Base then
>
> If an unknown value known to be a number is checked against zero, it is a falsy check, which may make things simpler for us.

## Input

`````js filename=intro
const x = $(1);
const a = x & $(1);
const atest = a === 0; // This is the same as !atest
if (atest) $('a');
else $('b');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const a /*:number*/ = x & tmpBinBothRhs;
const atest /*:boolean*/ = a === 0;
if (atest) {
  $(`a`);
} else {
  $(`b`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if ((x & $(1)) === 0) {
  $(`a`);
} else {
  $(`b`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a & b;
const d = c === 0;
if (d) {
  $( "a" );
}
else {
  $( "b" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
