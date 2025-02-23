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

## Pre Normal


`````js filename=intro
const tmpFree = function $free($$0, $$1, $$2) {
  let chr3 = $$0;
  let x$1 = $$1;
  let chr$1 = $$2;
  debugger;
  const tmpIfTest$3 = x$1 & 48;
  const tmpRet = tmpIfTest$3 === 48;
  const ret2 = tmpRet + chr$1 + chr3;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const unknown = $(`abc`);
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

## Normalized


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
  const tmpStringFirstArg = unknown;
  const somestr = $coerce(tmpStringFirstArg, `string`);
  const chr = somestr.charAt(1);
  const tmpIfTest$5 = $frfr(tmpFree, chr, x, chr);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
const tmpFree$1 /*:(string)=>string*/ = function $free($$0) {
  const somestr /*:string*/ = $$0;
  debugger;
  const chr /*:string*/ = somestr.charAt(1);
  const tmpIfTest$3 /*:number*/ = x & 48;
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
  const tmpIfTest$5 /*:string*/ = $frfr(tmpFree$1, somestr$1);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c.charAt( 1 );
  const e = f & 48;
  const g = e === 48;
  const h = g + d;
  const i = h + d;
  return i;
};
const j = $spy( 1 );
const f = +j;
if (f) {
  const k = $( "abc" );
  const l = $coerce( k, "string" );
  const m = n( a, l );
  if (m) {
    $( "it is 58" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - 3: 'abc'
 - 4: 'it is 58'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
