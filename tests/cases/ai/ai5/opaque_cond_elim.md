# Preval test case

# opaque_cond_elim.md

> Ai > Ai5 > Opaque cond elim
>
> Test elimination of redundant conditional branches with opaque values

## Input

`````js filename=intro
const x = $("test");
const y = $("test");
if (x === y) {
    const z = $("result");
    $(z);
} else {
    const z = $("result");
    $(z);
}

// Expected:
// const x = $("test");
// const y = $("test");
// const z = $("result");
// $(z);
`````


## Settled


`````js filename=intro
$(`test`);
$(`test`);
const z /*:unknown*/ = $(`result`);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`test`);
$(`test`);
$($(`result`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "test" );
$( "test" );
const a = $( "result" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = $(`test`);
const tmpIfTest = x === y;
if (tmpIfTest) {
  const z = $(`result`);
  $(z);
} else {
  const z$1 = $(`result`);
  $(z$1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test'
 - 3: 'result'
 - 4: 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
