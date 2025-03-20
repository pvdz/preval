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


## Settled


`````js filename=intro
const tmpFree /*:(primitive, primitive, primitive, primitive, primitive, primitive, primitive, primitive)=>boolean*/ = function $free(
  $$0,
  $$1,
  $$2,
  $$3,
  $$4,
  $$5,
  $$6,
  $$7,
) {
  const d /*:primitive*/ = $$0;
  const h /*:primitive*/ = $$1;
  const a /*:primitive*/ = $$2;
  const n /*:primitive*/ = $$3;
  const s /*:primitive*/ = $$4;
  const w /*:primitive*/ = $$5;
  const A /*:primitive*/ = $$6;
  const F /*:primitive*/ = $$7;
  debugger;
  const e /*:number*/ = parseInt(d);
  const i /*:number*/ = parseInt(h);
  const f /*:number*/ = -e;
  const j /*:number*/ = -i;
  const b /*:number*/ = parseInt(a);
  const g /*:number*/ = f / 2;
  const k /*:number*/ = j / 3;
  const o /*:number*/ = parseInt(n);
  const c /*:number*/ = b / 1;
  const l /*:number*/ = g * k;
  const p /*:number*/ = -o;
  const m /*:number*/ = c + l;
  const q /*:number*/ = p / 4;
  const t /*:number*/ = parseInt(s);
  const r /*:number*/ = m + q;
  const u /*:number*/ = t / 5;
  const x /*:number*/ = parseInt(w);
  const B /*:number*/ = parseInt(A);
  const v /*:number*/ = r + u;
  const y /*:number*/ = x / 6;
  const C /*:number*/ = -B;
  const G /*:number*/ = parseInt(F);
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
  const a$2 /*:primitive*/ = arr[286];
  const d$2 /*:primitive*/ = arr[181];
  const h$2 /*:primitive*/ = arr[308];
  const n$2 /*:primitive*/ = arr[32];
  const s$2 /*:primitive*/ = arr[86];
  const w$2 /*:primitive*/ = arr[87];
  const A$2 /*:primitive*/ = arr[30];
  const F$2 /*:primitive*/ = arr[356];
  const L$1 /*:boolean*/ = $frfr(tmpFree, d$2, h$2, a$2, n$2, s$2, w$2, A$2, F$2);
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(d, h, a, n, s, w, A, F) {
  const e = parseInt(d);
  const i = parseInt(h);
  const f = -e;
  const j = -i;
  const b = parseInt(a);
  const g = f / 2;
  const k = j / 3;
  const o = parseInt(n);
  const c = b / 1;
  const l = g * k;
  const p = -o;
  const m = c + l;
  const q = p / 4;
  const t = parseInt(s);
  const r = m + q;
  const u = t / 5;
  const x = parseInt(w);
  const B = parseInt(A);
  const v = r + u;
  const y = x / 6;
  const C = -B;
  const G = parseInt(F);
  const z = v + y;
  const D = C / 7;
  const H = -G;
  const E = z + D;
  const tmpRet = E + H / 8 === 644244;
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
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  $(arr[0]);
  const a$2 = arr[286];
  if ($frfr(tmpFree, arr[181], arr[308], a$2, arr[32], arr[86], arr[87], arr[30], arr[356])) {
    break;
  } else {
    arr.push(arr.shift());
  }
}
$(arr[0]);
`````


## PST Settled
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
  const l = parseInt( d );
  const m = -k;
  const n = -l;
  const o = parseInt( e );
  const p = m / 2;
  const q = n / 3;
  const r = parseInt( f );
  const s = o / 1;
  const t = p * q;
  const u = -r;
  const v = s + t;
  const w = u / 4;
  const x = parseInt( g );
  const y = v + w;
  const z = x / 5;
  const ba = parseInt( h );
  const bb = parseInt( i );
  const bc = y + z;
  const bd = ba / 6;
  const be = -bb;
  const bf = parseInt( j );
  const bg = bc + bd;
  const bh = be / 7;
  const bi = -bf;
  const bj = bg + bh;
  const bk = bi / 8;
  const bl = bj + bk;
  const bm = bl === 644244;
  return bm;
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
const bn = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const bo = bn[ 0 ];
  $( bo );
  const bp = bn[ 286 ];
  const bq = bn[ 181 ];
  const br = bn[ 308 ];
  const bs = bn[ 32 ];
  const bt = bn[ 86 ];
  const bu = bn[ 87 ];
  const bv = bn[ 30 ];
  const bw = bn[ 356 ];
  const bx = by( a, bq, br, bp, bs, bt, bu, bv, bw );
  if (bx) {
    break;
  }
  else {
    const bz = bn.shift();
    bn.push( bz );
  }
}
const ca = bn[ 0 ];
$( ca );
`````


## Todos triggered


- inline computed array property read
- maybe we can inline a primitive into a frfr that is called multiple times, too?
- Calling a static method on an ident that is not global and not recorded: $arr_push


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
