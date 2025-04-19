# Preval test case

# merge_up2.md

> Free > Merge up2
>
> Merge an $frfr() with a predictable statement above
> In this case the const is passed in twice and that should work too

## Input

`````js filename=intro
const tmpFree = function $free(chr3, x$1, chr$1) {
  const tmpIfTest$3 /*:number*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const ret2 = tmpRet + chr$1 + chr3;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const unknown = $('abc');
  const somestr = String(unknown);
  const chr = somestr.charAt(1);
  const tmpIfTest$5 = $frfr(tmpFree, chr, x, chr);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````


## Settled


`````js filename=intro
const tmpFree$1 /*:(string, number)=>string*/ = function $free($$0, $$1) {
  const somestr /*:string*/ = $$0;
  const x$1 /*:number*/ = $$1;
  debugger;
  const chr /*:string*/ = $dotCall($string_charAt, somestr, `charAt`, 1);
  const tmpIfTest$3 /*:number*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const tmpBinLhs /*:string*/ = tmpRet + chr;
  const ret2 /*:string*/ = tmpBinLhs + chr;
  return ret2;
};
const tmpUnaryArg /*:unknown*/ = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const unknown /*:unknown*/ = $(`abc`);
  const somestr$1 /*:string*/ = $coerce(unknown, `string`);
  const tmpIfTest$5 /*:string*/ = $frfr(tmpFree$1, somestr$1, x);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(somestr, x$1) {
  const chr = $dotCall($string_charAt, somestr, `charAt`, 1);
  const ret2 = ((x$1 & 48) === 48) + chr + chr;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  if ($frfr(tmpFree$1, $coerce($(`abc`), `string`), x)) {
    $(`it is 58`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = $dotCall( $string_charAt, c, "charAt", 1 );
  const f = d & 48;
  const g = f === 48;
  const h = g + e;
  const i = h + e;
  return i;
};
const j = $spy( 1 );
const k = +j;
if (k) {
  const l = $( "abc" );
  const m = $coerce( l, "string" );
  const n = o( a, m, k );
  if (n) {
    $( "it is 58" );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - 3: 'abc'
 - 4: 'it is 58'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
