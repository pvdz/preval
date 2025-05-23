# Preval test case

# and_32_neq_0_31.md

> Bit hacks > And > And 32 neq 0 31
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
$(f(31));
`````


## Settled


`````js filename=intro
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return `a`;
  } else {
    return `b`;
  }
};
let tmpCalleeParam = f(31);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
