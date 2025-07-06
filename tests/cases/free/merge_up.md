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
  const extra$2 /*:string*/ /*truthy*/ = `${tmpStringConcatR}x`;
  const chr /*:string*/ = $dotCall($string_charAt, extra$2, `charAt`, 1);
  const tmpIfTest$3 /*:number*/ /*&48*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const ret2 /*:string*/ = tmpRet + chr;
  return ret2;
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
  const ret2 = ((x$1 & 48) === 48) + chr;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  if (tmpFree(String($(`abc`)), x)) {
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
  const d = `${b}x`;
  const e = $dotCall( $string_charAt, d, "charAt", 1 );
  const f = c & 48;
  const g = f === 48;
  const h = g + e;
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
const tmpFree = function $free($$0, $$1) {
  let x$1 = $$0;
  let chr$1 = $$1;
  debugger;
  const tmpIfTest$3 = x$1 & 48;
  const tmpRet = tmpIfTest$3 === 48;
  const ret2 = tmpRet + chr$1;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const unknown = $(`abc`);
  const somestr = $coerce(unknown, `string`);
  const tmpStringConcatR = $coerce(somestr, `plustr`);
  const extra = `${tmpStringConcatR}x`;
  const tmpMCF = extra.charAt;
  const chr = $dotCall(tmpMCF, extra, `charAt`, 1);
  const tmpIfTest$5 = $frfr(tmpFree, x, chr);
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
