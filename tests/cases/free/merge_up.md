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

## Pre Normal


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
  const somestr = String(unknown);
  const extra = somestr + `x`;
  const chr = extra.charAt(1);
  const tmpIfTest$5 = $frfr(tmpFree, x, chr);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## Normalized


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
  const tmpStringFirstArg = unknown;
  const somestr = $coerce(tmpStringFirstArg, `string`);
  const tmpStringConcatR = $coerce(somestr, `plustr`);
  const extra = `${tmpStringConcatR}x`;
  const chr = extra.charAt(1);
  const tmpIfTest$5 = $frfr(tmpFree, x, chr);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
const tmpFree$2 /*:(string)=>string*/ = function $free($$0) {
  const somestr /*:string*/ = $$0;
  debugger;
  const extra$1 /*:string*/ = `${somestr}x`;
  const chr /*:string*/ = extra$1.charAt(1);
  const tmpIfTest$3 /*:number*/ = x & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  const ret2 /*:string*/ = tmpRet + chr;
  return ret2;
};
const tmpUnaryArg = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const unknown = $(`abc`);
  const somestr$1 /*:string*/ = $coerce(unknown, `string`);
  const tmpIfTest$5 /*:string*/ = $frfr(tmpFree$2, somestr$1);
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
  const c = d;
  debugger;
  const e = `${c}x`;
  const f = e.charAt( 1 );
  const g = h & 48;
  const i = g === 48;
  const j = i + f;
  return j;
};
const k = $spy( 1 );
const h = +k;
if (h) {
  const l = $( "abc" );
  const m = $coerce( l, "string" );
  const n = o( a, m );
  if (n) {
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
