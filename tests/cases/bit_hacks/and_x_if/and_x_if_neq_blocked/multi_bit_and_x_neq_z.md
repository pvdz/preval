# Preval test case

# multi_bit_and_x_neq_z.md

> Bit hacks > And x if > And x if neq blocked > Multi bit and x neq z
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
if (y !== 3) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(200);
const y /*:number*/ /*&200*/ = x & 200;
$(y);
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(200) & 200);
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 200 );
const b = a & 200;
$( b );
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
const tmpIfTest = y !== 3;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 200
 - 2: 200
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
