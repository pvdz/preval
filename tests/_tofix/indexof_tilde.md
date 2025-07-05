# Preval test case

# indexof_tilde.md

> Tofix > indexof tilde
>
> Doing tilde on an indexOf result and checking the result is basically an includes

## Input

`````js filename=intro
const data = $('data') + '';
const i = data.indexOf('a');
if (~i) {
  $('has');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const tmpFree /*:(string)=>number*/ = function $free($$0) {
  const data$1 /*:string*/ = $$0;
  debugger;
  const i /*:number*/ = $dotCall($string_indexOf, data$1, `indexOf`, `a`);
  const tmpRet /*:number*/ = ~i;
  return tmpRet;
};
const tmpBinLhs /*:unknown*/ = $(`data`);
const data /*:string*/ = $coerce(tmpBinLhs, `plustr`);
const tmpIfTest /*:number*/ = $frfr(tmpFree, data);
if (tmpIfTest) {
  $(`has`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(data$1) {
  const i = $dotCall($string_indexOf, data$1, `indexOf`, `a`);
  const tmpRet = ~i;
  return tmpRet;
};
if (tmpFree($(`data`) + ``)) {
  $(`has`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $dotCall( $string_indexOf, c, "indexOf", "a" );
  const e = ~d;
  return e;
};
const f = $( "data" );
const g = $coerce( f, "plustr" );
const h = i( a, g );
if (h) {
  $( "has" );
}
else {
  $( "fail" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = $(`data`);
const data = $coerce(tmpBinLhs, `plustr`);
const tmpMCF = data.indexOf;
const i = $dotCall(tmpMCF, data, `indexOf`, `a`);
const tmpIfTest = ~i;
if (tmpIfTest) {
  $(`has`);
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
 - 1: 'data'
 - 2: 'has'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
