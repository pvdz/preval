# Preval test case

# and_13.md

> Bit hacks > If return bit > And 13
>
> Make sure the trick is not over-reaching

## Input

`````js filename=intro
function f(a) {
  const x = a & 13;             // 13 is not 1 bit so we can only predict else-branch
  if (x) return `this is ${x}`;
  else return `alt path is always ${x}`;
}
$((f($(16))));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(16);
const x$1 /*:number*/ /*&13*/ = tmpCalleeParam$1 & 13;
if (x$1) {
  const tmpReturnArg /*:string*/ /*truthy*/ = `this is ${x$1}`;
  $(tmpReturnArg);
} else {
  $(`alt path is always 0`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x$1 = $(16) & 13;
if (x$1) {
  $(`this is ${x$1}`);
} else {
  $(`alt path is always 0`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 16 );
const b = a & 13;
if (b) {
  const c = `this is ${b}`;
  $( c );
}
else {
  $( "alt path is always 0" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 13;
  if (x) {
    const tmpBinBothLhs = `this is `;
    const tmpBinBothRhs = $coerce(x, `string`);
    const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
    const tmpReturnArg = $coerce(tmpBinLhs, `plustr`);
    return tmpReturnArg;
  } else {
    const tmpBinBothLhs$1 = `alt path is always `;
    const tmpBinBothRhs$1 = $coerce(x, `string`);
    const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    const tmpReturnArg$1 = $coerce(tmpBinLhs$1, `plustr`);
    return tmpReturnArg$1;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(16);
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 16
 - 2: 'alt path is always 0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
