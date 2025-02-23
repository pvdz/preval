# Preval test case

# total.md

> Try escaping > Total
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
while (true) {
  $(arr[0]);
  // The point of this test is that all these const inits can be asserted not to throw
  // - the array index access with number literal can not throw (I think)
  // - parseInt can not throw
  // - binary operations don't throw when not coercing
  // - unary operators don't throw when not coercing
  // So all these const decls can be moved to above the Try
  // After that;
  // - the If on a local variable that appears earlier can not throw
  // - A break can not throw
  // - calling shift on a constant that is an array literal, can not throw if you assume built-ins are sound (underflow is fine)
  // - same for push (array size overflow not withstanding)
  // At the end of it, the Try is empty and eliminated entirely.
  try {
    const a = arr[286];
    const b = parseInt(a);
    const c = b / 1;
    const d = arr[181];
    const e = parseInt(d);
    const f = -e;
    const g = f / 2;
    const h = arr[308];
    const i = parseInt(h);
    const j = -i;
    const k = j / 3;
    const l = g * k;
    const m = c + l;
    const n = arr[32];
    const o = parseInt(n);
    const p = -o;
    const q = p / 4;
    const r = m + q;
    const s = arr[86];
    const t = parseInt(s);
    const u = t / 5;
    const v = r + u;
    const w = arr[87];
    const x = parseInt(w);
    const y = x / 6;
    const z = v + y;
    const A = arr[30];
    const B = parseInt(A);
    const C = -B;
    const D = C / 7;
    const E = z + D;
    const F = arr[356];
    const G = parseInt(F);
    const H = -G;
    const I = H / 8;
    const K = E + I;
    const L = K === 644244;
    if (L) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    const N = arr.shift();
    arr.push(N);
  }
}
$(arr[0]);
`````

## Pre Normal


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  $(arr[0]);
  try {
    const a = arr[286];
    const b = parseInt(a);
    const c = b / 1;
    const d = arr[181];
    const e = parseInt(d);
    const f = -e;
    const g = f / 2;
    const h = arr[308];
    const i = parseInt(h);
    const j = -i;
    const k = j / 3;
    const l = g * k;
    const m = c + l;
    const n = arr[32];
    const o = parseInt(n);
    const p = -o;
    const q = p / 4;
    const r = m + q;
    const s = arr[86];
    const t = parseInt(s);
    const u = t / 5;
    const v = r + u;
    const w = arr[87];
    const x = parseInt(w);
    const y = x / 6;
    const z = v + y;
    const A = arr[30];
    const B = parseInt(A);
    const C = -B;
    const D = C / 7;
    const E = z + D;
    const F = arr[356];
    const G = parseInt(F);
    const H = -G;
    const I = H / 8;
    const K = E + I;
    const L = K === 644244;
    if (L) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    const N = arr.shift();
    arr.push(N);
  }
}
$(arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = arr[0];
  tmpCallCallee(tmpCalleeParam);
  try {
    const a = arr[286];
    const b = parseInt(a);
    const c = b / 1;
    const d = arr[181];
    const e = parseInt(d);
    const f = -e;
    const g = f / 2;
    const h = arr[308];
    const i = parseInt(h);
    const j = -i;
    const k = j / 3;
    const l = g * k;
    const m = c + l;
    const n = arr[32];
    const o = parseInt(n);
    const p = -o;
    const q = p / 4;
    const r = m + q;
    const s = arr[86];
    const t = parseInt(s);
    const u = t / 5;
    const v = r + u;
    const w = arr[87];
    const x = parseInt(w);
    const y = x / 6;
    const z = v + y;
    const A = arr[30];
    const B = parseInt(A);
    const C = -B;
    const D = C / 7;
    const E = z + D;
    const F = arr[356];
    const G = parseInt(F);
    const H = -G;
    const I = H / 8;
    const K = E + I;
    const L = K === 644244;
    if (L) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    const N = arr.shift();
    arr.push(N);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = arr[0];
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpFree /*:(unknown, number, number, number, number, number, number, number)=>boolean*/ = function $free(
  $$0,
  $$1,
  $$2,
  $$3,
  $$4,
  $$5,
  $$6,
  $$7,
) {
  const F /*:unknown*/ = $$0;
  const e /*:number*/ = $$1;
  const i /*:number*/ = $$2;
  const b /*:number*/ = $$3;
  const o /*:number*/ = $$4;
  const t /*:number*/ = $$5;
  const x /*:number*/ = $$6;
  const B /*:number*/ = $$7;
  debugger;
  const G /*:number*/ = parseInt(F);
  const f /*:number*/ = -e;
  const j /*:number*/ = -i;
  const g /*:number*/ = f / 2;
  const k /*:number*/ = j / 3;
  const c /*:number*/ = b / 1;
  const l /*:number*/ = g * k;
  const p /*:number*/ = -o;
  const m /*:number*/ = c + l;
  const q /*:number*/ = p / 4;
  const r /*:number*/ = m + q;
  const u /*:number*/ = t / 5;
  const v /*:number*/ = r + u;
  const y /*:number*/ = x / 6;
  const C /*:number*/ = -B;
  const z /*:number*/ = v + y;
  const D /*:number*/ = C / 7;
  const H /*:number*/ = -G;
  const E /*:number*/ = z + D;
  const I /*:number*/ = H / 8;
  const K /*:number*/ = E + I;
  const tmpRet /*:boolean*/ = K === 644244;
  return tmpRet;
};
$(`a`);
$(`b`);
$(`c`);
$(`d`);
$(`e`);
$(`f`);
$(`g`);
$(`h`);
$(`i`);
$(`j`);
$(`k`);
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$2 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$2);
  const a$1 /*:primitive*/ = arr[286];
  const b$2 /*:number*/ = parseInt(a$1);
  const d$1 /*:primitive*/ = arr[181];
  const e$2 /*:number*/ = parseInt(d$1);
  const h$1 /*:primitive*/ = arr[308];
  const i$2 /*:number*/ = parseInt(h$1);
  const n$1 /*:primitive*/ = arr[32];
  const o$2 /*:number*/ = parseInt(n$1);
  const s$1 /*:primitive*/ = arr[86];
  const t$2 /*:number*/ = parseInt(s$1);
  const w$1 /*:primitive*/ = arr[87];
  const x$2 /*:number*/ = parseInt(w$1);
  const A$1 /*:primitive*/ = arr[30];
  const B$2 /*:number*/ = parseInt(A$1);
  const F$2 /*:primitive*/ = arr[356];
  const L$1 /*:boolean*/ = $frfr(tmpFree, F$2, e$2, i$2, b$2, o$2, t$2, x$2, B$2);
  if (L$1) {
    break;
  } else {
    const M$1 /*:unknown*/ = arr.shift();
    arr.push(M$1);
  }
}
const tmpCalleeParam$1 /*:primitive*/ = arr[0];
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1,$$2,$$3,$$4,$$5,$$6,$$7 ) {
  const c = $$0;
  const d = $$1;
  const e = $$2;
  const f = $$3;
  const g = $$4;
  const h = $$5;
  const i = $$6;
  const j = $$7;
  debugger;
  const k = parseInt( c );
  const l = -d;
  const m = -e;
  const n = l / 2;
  const o = m / 3;
  const p = f / 1;
  const q = n * o;
  const r = -g;
  const s = p + q;
  const t = r / 4;
  const u = s + t;
  const v = h / 5;
  const w = u + v;
  const x = i / 6;
  const y = -j;
  const z = w + x;
  const ba = y / 7;
  const bb = -k;
  const bc = z + ba;
  const bd = bb / 8;
  const be = bc + bd;
  const bf = be === 644244;
  return bf;
};
$( "a" );
$( "b" );
$( "c" );
$( "d" );
$( "e" );
$( "f" );
$( "g" );
$( "h" );
$( "i" );
$( "j" );
$( "k" );
const bg = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const bh = bg[ 0 ];
  $( bh );
  const bi = bg[ 286 ];
  const bj = parseInt( bi );
  const bk = bg[ 181 ];
  const bl = parseInt( bk );
  const bm = bg[ 308 ];
  const bn = parseInt( bm );
  const bo = bg[ 32 ];
  const bp = parseInt( bo );
  const bq = bg[ 86 ];
  const br = parseInt( bq );
  const bs = bg[ 87 ];
  const bt = parseInt( bs );
  const bu = bg[ 30 ];
  const bv = parseInt( bu );
  const bw = bg[ 356 ];
  const bx = by( a, bw, bl, bn, bj, bp, br, bt, bv );
  if (bx) {
    break;
  }
  else {
    const bz = bg.shift();
    bg.push( bz );
  }
}
const ca = bg[ 0 ];
$( ca );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'e'
 - 6: 'f'
 - 7: 'g'
 - 8: 'h'
 - 9: 'i'
 - 10: 'j'
 - 11: 'k'
 - 12: 'a'
 - 13: 'b'
 - 14: 'c'
 - 15: 'd'
 - 16: 'e'
 - 17: 'f'
 - 18: 'g'
 - 19: 'h'
 - 20: 'i'
 - 21: 'j'
 - 22: 'k'
 - 23: 'a'
 - 24: 'b'
 - 25: 'c'
 - 26: 'd'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
