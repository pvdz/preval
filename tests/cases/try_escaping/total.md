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
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$2 = arr[0];
  $(tmpCalleeParam$2);
  const a$1 = arr[286];
  const b$1 = parseInt(a$1);
  const d$1 = arr[181];
  const e$1 = parseInt(d$1);
  const h$1 = arr[308];
  const i$1 = parseInt(h$1);
  const n$1 = arr[32];
  const o$1 = parseInt(n$1);
  const s$1 = arr[86];
  const t$1 = parseInt(s$1);
  const w$1 = arr[87];
  const x$1 = parseInt(w$1);
  const A$1 = arr[30];
  const B$1 = parseInt(A$1);
  const F$1 = arr[356];
  const G$1 = parseInt(F$1);
  const f$1 = -e$1;
  const j$1 = -i$1;
  const g$1 = f$1 / 2;
  const k$1 = j$1 / 3;
  const c$1 = b$1 / 1;
  const l$1 = g$1 * k$1;
  const p$1 = -o$1;
  const m$1 = c$1 + l$1;
  const q$1 = p$1 / 4;
  const r$1 = m$1 + q$1;
  const u$1 = t$1 / 5;
  const v$1 = r$1 + u$1;
  const y$1 = x$1 / 6;
  const C$1 = -B$1;
  const z$1 = v$1 + y$1;
  const D$1 = C$1 / 7;
  const H$1 = -G$1;
  const E$1 = z$1 + D$1;
  const I$1 = H$1 / 8;
  const K$1 = E$1 + I$1;
  const L$1 = K$1 === 644244;
  if (L$1) {
    break;
  } else {
    const M$1 = arr.shift();
    arr.push(M$1);
  }
}
const tmpCalleeParam$1 = arr[0];
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
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
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  const c = a[ 286 ];
  const d = parseInt( c );
  const e = a[ 181 ];
  const f = parseInt( e );
  const g = a[ 308 ];
  const h = parseInt( g );
  const i = a[ 32 ];
  const j = parseInt( i );
  const k = a[ 86 ];
  const l = parseInt( k );
  const m = a[ 87 ];
  const n = parseInt( m );
  const o = a[ 30 ];
  const p = parseInt( o );
  const q = a[ 356 ];
  const r = parseInt( q );
  const s = -f;
  const t = -h;
  const u = s / 2;
  const v = t / 3;
  const w = d / 1;
  const x = u * v;
  const y = -j;
  const z = w + x;
  const ba = y / 4;
  const bb = z + ba;
  const bc = l / 5;
  const bd = bb + bc;
  const be = n / 6;
  const bf = -p;
  const bg = bd + be;
  const bh = bf / 7;
  const bi = -r;
  const bj = bg + bh;
  const bk = bi / 8;
  const bl = bj + bk;
  const bm = bl === 644244;
  if (bm) {
    break;
  }
  else {
    const bn = a.shift();
    a.push( bn );
  }
}
const bo = a[ 0 ];
$( bo );
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
