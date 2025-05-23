# Preval test case

# merge_up.md

> Free > Merge up
>
> Merge an $frfr() with a predictable statement above

## Input

`````js filename=intro
const tmpFree = function $free(x$1, chr$1) {
  const tmpIfTest$3 /*:number*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const ret2 = tmpRet + chr$1;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const unknown = $('abc');
  const somestr = String(unknown);
  const extra = somestr + 'x';
  const chr = extra.charAt(1);
  const tmpIfTest$5 = $frfr(tmpFree, x, chr);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````


## Settled


`````js filename=intro
const tmpFree /*:(string, number)=>string*/ = function $free($$0, $$1) {
  const tmpStringConcatR /*:string*/ = $$0;
  const x$1 /*:number*/ = $$1;
  debugger;
  const extra$1 /*:string*/ = `${tmpStringConcatR}x`;
  const chr /*:string*/ = $dotCall($string_charAt, extra$1, `charAt`, 1);
  const tmpIfTest$3 /*:number*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const tmpRet$2 /*:string*/ = tmpRet + chr;
  return tmpRet$2;
};
const tmpUnaryArg /*:unknown*/ = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const unknown /*:unknown*/ = $(`abc`);
  const tmpStringConcatR$1 /*:string*/ = $coerce(unknown, `string`);
  const tmpIfTest$5 /*:string*/ = $frfr(tmpFree, tmpStringConcatR$1, x);
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
const tmpFree = function $free(tmpStringConcatR, x$1) {
  const chr = $dotCall($string_charAt, `${tmpStringConcatR}x`, `charAt`, 1);
  const tmpRet$2 = ((x$1 & 48) === 48) + chr;
  return tmpRet$2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  if ($frfr(tmpFree, $coerce($(`abc`), `string`), x)) {
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
  const e = `${c}x`;
  const f = $dotCall( $string_charAt, e, "charAt", 1 );
  const g = d & 48;
  const h = g === 48;
  const i = h + f;
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
