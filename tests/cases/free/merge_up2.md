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
  const somestr$1 /*:string*/ = $$0;
  const x$1 /*:number*/ = $$1;
  debugger;
  const chr /*:string*/ = $dotCall($string_charAt, somestr$1, `charAt`, 1);
  const tmpIfTest$3 /*:number*/ /*&48*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const tmpBinLhs /*:string*/ = tmpRet + chr;
  const ret2 /*:string*/ = `${tmpBinLhs}${chr}`;
  return ret2;
};
const tmpUnaryArg /*:unknown*/ = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const unknown /*:unknown*/ = $(`abc`);
  const somestr$2 /*:string*/ = $coerce(unknown, `string`);
  const tmpIfTest$5 /*:string*/ = $frfr(tmpFree$1, somestr$2, x);
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
const tmpFree$1 = function $free(somestr$1, x$1) {
  const chr = $dotCall($string_charAt, somestr$1, `charAt`, 1);
  const tmpBinLhs = ((x$1 & 48) === 48) + chr;
  const ret2 = `${tmpBinLhs}${chr}`;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  if (tmpFree$1(String($(`abc`)), x)) {
    $(`it is 58`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = $dotCall( $string_charAt, b, "charAt", 1 );
  const e = c & 48;
  const f = e === 48;
  const g = f + d;
  const h = `${g}${d}`;
  return h;
};
const i = $spy( 1 );
const j = +i;
if (j) {
  const k = $( "abc" );
  const l = $coerce( k, "string" );
  const m = n( a, l, j );
  if (m) {
    $( "it is 58" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0, $$1, $$2) {
  let chr3 = $$0;
  let x$1 = $$1;
  let chr$1 = $$2;
  debugger;
  const tmpIfTest$3 = x$1 & 48;
  const tmpRet = tmpIfTest$3 === 48;
  const tmpBinLhs = tmpRet + chr$1;
  const ret2 = tmpBinLhs + chr3;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const unknown = $(`abc`);
  const somestr = $coerce(unknown, `string`);
  const tmpMCF = somestr.charAt;
  const chr = $dotCall(tmpMCF, somestr, `charAt`, 1);
  const tmpIfTest$5 = $frfr(tmpFree, chr, x, chr);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
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
