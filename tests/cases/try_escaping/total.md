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
const tmpFree /*:(number, number, number, number)=>boolean*/ = function $free($$0, $$1, $$2, $$3) {
  const v /*:number*/ = $$0;
  const y /*:number*/ = $$1;
  const C /*:number*/ = $$2;
  const G /*:number*/ = $$3;
  debugger;
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
  const d$1 /*:primitive*/ = arr[181];
  const h$1 /*:primitive*/ = arr[308];
  const n$1 /*:primitive*/ = arr[32];
  const s$1 /*:primitive*/ = arr[86];
  const w$1 /*:primitive*/ = arr[87];
  const A$1 /*:primitive*/ = arr[30];
  const F$1 /*:primitive*/ = arr[356];
  const e$1 /*:number*/ = parseInt(d$1);
  const i$1 /*:number*/ = parseInt(h$1);
  const f$1 /*:number*/ = -e$1;
  const j$1 /*:number*/ = -i$1;
  const b$1 /*:number*/ = parseInt(a$1);
  const g$1 /*:number*/ = f$1 / 2;
  const k$1 /*:number*/ = j$1 / 3;
  const o$1 /*:number*/ = parseInt(n$1);
  const c$1 /*:number*/ = b$1 / 1;
  const l$1 /*:number*/ = g$1 * k$1;
  const p$1 /*:number*/ = -o$1;
  const m$3 /*:number*/ = c$1 + l$1;
  const q$1 /*:number*/ = p$1 / 4;
  const t$1 /*:number*/ = parseInt(s$1);
  const r$3 /*:number*/ = m$3 + q$1;
  const u$1 /*:number*/ = t$1 / 5;
  const x$1 /*:number*/ = parseInt(w$1);
  const B$1 /*:number*/ = parseInt(A$1);
  const v$2 /*:number*/ = r$3 + u$1;
  const y$2 /*:number*/ = x$1 / 6;
  const C$2 /*:number*/ = -B$1;
  const G$2 /*:number*/ = parseInt(F$1);
  const L$1 /*:boolean*/ = $frfr(tmpFree, v$2, y$2, C$2, G$2);
  if (L$1) {
    break;
  } else {
    const M$1 /*:primitive*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, M$1);
  }
}
const tmpCalleeParam$1 /*:primitive*/ = arr[0];
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(v, y, C, G) {
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
  const a$1 = arr[286];
  const d$1 = arr[181];
  const h$1 = arr[308];
  const n$1 = arr[32];
  const s$1 = arr[86];
  const w$1 = arr[87];
  const A$1 = arr[30];
  const F$1 = arr[356];
  const e$1 = parseInt(d$1);
  const i$1 = parseInt(h$1);
  const f$1 = -e$1;
  const j$1 = -i$1;
  const b$1 = parseInt(a$1);
  const g$1 = f$1 / 2;
  const k$1 = j$1 / 3;
  const o$1 = parseInt(n$1);
  const c$1 = b$1 / 1;
  const l$1 = g$1 * k$1;
  const p$1 = -o$1;
  const m$3 = c$1 + l$1;
  const q$1 = p$1 / 4;
  const t$1 = parseInt(s$1);
  const r$3 = m$3 + q$1;
  const u$1 = t$1 / 5;
  const x$1 = parseInt(w$1);
  const B$1 = parseInt(A$1);
  if ($frfr(tmpFree, r$3 + u$1, x$1 / 6, -B$1, parseInt(F$1))) {
    break;
  } else {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
$(arr[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1,$$2,$$3 ) {
  const c = $$0;
  const d = $$1;
  const e = $$2;
  const f = $$3;
  debugger;
  const g = c + d;
  const h = e / 7;
  const i = -f;
  const j = g + h;
  const k = i / 8;
  const l = j + k;
  const m = l === 644244;
  return m;
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
const n = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const o = n[ 0 ];
  $( o );
  const p = n[ 286 ];
  const q = n[ 181 ];
  const r = n[ 308 ];
  const s = n[ 32 ];
  const t = n[ 86 ];
  const u = n[ 87 ];
  const v = n[ 30 ];
  const w = n[ 356 ];
  const x = parseInt( q );
  const y = parseInt( r );
  const z = -x;
  const ba = -y;
  const bb = parseInt( p );
  const bc = z / 2;
  const bd = ba / 3;
  const be = parseInt( s );
  const bf = bb / 1;
  const bg = bc * bd;
  const bh = -be;
  const bi = bf + bg;
  const bj = bh / 4;
  const bk = parseInt( t );
  const bl = bi + bj;
  const bm = bk / 5;
  const bn = parseInt( u );
  const bo = parseInt( v );
  const bp = bl + bm;
  const bq = bn / 6;
  const br = -bo;
  const bs = parseInt( w );
  const bt = bu( a, bp, bq, br, bs );
  if (bt) {
    break;
  }
  else {
    const bv = $dotCall( $array_shift, n, "shift" );
    $dotCall( $array_push, n, "push", bv );
  }
}
const bw = n[ 0 ];
$( bw );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) regular property access of an ident feels tricky;
- (todo) maybe we can inline a primitive into a frfr that is called multiple times, too?
- (todo) Record this phase1.1 as a test case, please (A)
- (todo) free with zero args, we can eliminate this?
- (todo) outline any args for tdz
- (todo) do we want to support Literal as expression statement in free loops?


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
