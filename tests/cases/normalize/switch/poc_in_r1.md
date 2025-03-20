# Preval test case

# poc_in_r1.md

> Normalize > Switch > Poc in r1
>
> Fall through example

Regression case

## Input

`````js filename=intro
let x = 1;
switch (x) {
 case $(1):
   $('A');
}
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = 1 === tmpBinBothRhs;
if (tmpIfTest) {
  $(`A`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
if (1 === tmpBinBothRhs) {
  $(`A`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 === a;
if (b) {
  $( "A" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
