# Preval test case

# or_bool_used.md

> Bit hacks > Or bool used
>
> Orring with a non-zero number always results in truthy

## Input

`````js filename=intro
const x = $(1234);
const y = x | 200;
if (y) {
  $('ALWAYS' + y);
} else {
  $('FAIL');
}
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const y$1 /*:number*/ = $$0;
  debugger;
  const tmpStringConcatL /*:string*/ = $coerce(y$1, `string`);
  const tmpRet /*:string*/ /*truthy*/ = `ALWAYS${tmpStringConcatL}`;
  return tmpRet;
};
const x /*:unknown*/ = $(1234);
const y /*:number*/ /*truthy*/ /*|200*/ = x | 200;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, y);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(y$1) {
  const tmpRet = `ALWAYS${y$1}`;
  return tmpRet;
};
$($frfr(tmpFree, $(1234) | 200));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `ALWAYS${d}`;
  return e;
};
const f = $( 1234 );
const g = f | 200;
const h = i( a, g );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1234);
const y = x | 200;
if (y) {
  const tmpStringConcatL = $coerce(y, `plustr`);
  let tmpCalleeParam = `ALWAYS${tmpStringConcatL}`;
  $(tmpCalleeParam);
} else {
  $(`FAIL`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1234
 - 2: 'ALWAYS1242'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
