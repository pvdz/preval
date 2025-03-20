# Preval test case

# and_32_neq_0_33.md

> Bit hacks > And > And 32 neq 0 33
>
> Not sure what's up

## Input

`````js filename=intro
function f(x) {
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return 'a';
  } else {
    return 'b';
  }
};
$(f(33));
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
const b /*:unknown*/ = $(20);
$(a, b);
$(`a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10), $(20));
$(`a`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
$( a, b );
$( "a" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 10, 20
 - 4: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
