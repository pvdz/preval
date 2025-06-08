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
const tmpFree$2 /*:(primitive, number, number, primitive, primitive, primitive, primitive, primitive)=>boolean*/ = function $free(
  $$0,
  $$1,
  $$2,
  $$3,
  $$4,
  $$5,
  $$6,
  $$7,
) {
  const a /*:primitive*/ = $$0;
  const f$1 /*:number*/ = $$1;
  const j$2 /*:number*/ = $$2;
  const n$3 /*:primitive*/ = $$3;
  const s$1 /*:primitive*/ = $$4;
  const w$4 /*:primitive*/ = $$5;
  const A$1 /*:primitive*/ = $$6;
  const F$2 /*:primitive*/ = $$7;
  debugger;
  const b$4 /*:number*/ = $Number_parseInt(a);
  const g$4 /*:number*/ = f$1 / 2;
  const k$3 /*:number*/ = j$2 / 3;
  const o$3 /*:number*/ = $Number_parseInt(n$3);
  const c$3 /*:number*/ = b$4 / 1;
  const l$2 /*:number*/ = g$4 * k$3;
  const p$2 /*:number*/ = -o$3;
  const m$3 /*:number*/ = c$3 + l$2;
  const q$2 /*:number*/ = p$2 / 4;
  const t$2 /*:number*/ = $Number_parseInt(s$1);
  const r$4 /*:number*/ = m$3 + q$2;
  const u$3 /*:number*/ = t$2 / 5;
  const x$2 /*:number*/ = $Number_parseInt(w$4);
  const B$1 /*:number*/ = $Number_parseInt(A$1);
  const v /*:number*/ = r$4 + u$3;
  const y /*:number*/ = x$2 / 6;
  const C /*:number*/ = -B$1;
  const G /*:number*/ = $Number_parseInt(F$2);
  const z /*:number*/ = v + y;
  const D /*:number*/ = C / 7;
  const H /*:number*/ = -G;
  const E /*:number*/ = z + D;
  const I /*:number*/ = H / 8;
  const K /*:number*/ = E + I;
  const tmpRet$2 /*:boolean*/ = K === 644244;
  return tmpRet$2;
};
const tmpFree$1 /*:(primitive)=>number*/ = function $free($$0) {
  const h /*:primitive*/ = $$0;
  debugger;
  const i /*:number*/ = $Number_parseInt(h);
  const tmpRet$1 /*:number*/ = -i;
  return tmpRet$1;
};
const tmpFree /*:(primitive)=>number*/ = function $free($$0) {
  const d /*:primitive*/ = $$0;
  debugger;
  const e /*:number*/ = $Number_parseInt(d);
  const tmpRet /*:number*/ = -e;
  return tmpRet;
};
const arr /*:array*/ /*truthy*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
loopStop: {
  $(`a`);
  const a$1 /*:primitive*/ = arr[286];
  const d$1 /*:primitive*/ = arr[181];
  try {
    const f$2 /*:number*/ = $frfr(tmpFree, d$1);
    const h$1 /*:primitive*/ = arr[308];
    const j$3 /*:number*/ = $frfr(tmpFree$1, h$1);
    const n$4 /*:primitive*/ = arr[32];
    const s$2 /*:primitive*/ = arr[86];
    const w$1 /*:primitive*/ = arr[87];
    const A$2 /*:primitive*/ = arr[30];
    const F$3 /*:primitive*/ = arr[356];
    const L /*:boolean*/ = $frfr(tmpFree$2, a$1, f$2, j$3, n$4, s$2, w$1, A$2, F$3);
    if (L) {
      break loopStop;
    } else {
      const M /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M);
    }
  } catch (P) {
    const N /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N);
  }
  const tmpCalleeParam$2 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$2);
  const a$2 /*:primitive*/ = arr[286];
  const d$2 /*:primitive*/ = arr[181];
  try {
    const f$3 /*:number*/ = $frfr(tmpFree, d$2);
    const h$2 /*:primitive*/ = arr[308];
    const j$1 /*:number*/ = $frfr(tmpFree$1, h$2);
    const n$1 /*:primitive*/ = arr[32];
    const s$3 /*:primitive*/ = arr[86];
    const w$2 /*:primitive*/ = arr[87];
    const A$3 /*:primitive*/ = arr[30];
    const F$1 /*:primitive*/ = arr[356];
    const L$1 /*:boolean*/ = $frfr(tmpFree$2, a$2, f$3, j$1, n$1, s$3, w$2, A$3, F$1);
    if (L$1) {
      break loopStop;
    } else {
      const M$1 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$1);
    }
  } catch (P$1) {
    const N$1 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$1);
  }
  const tmpCalleeParam$3 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$3);
  const a$3 /*:primitive*/ = arr[286];
  const d$3 /*:primitive*/ = arr[181];
  try {
    const f$4 /*:number*/ = $frfr(tmpFree, d$3);
    const h$3 /*:primitive*/ = arr[308];
    const j$4 /*:number*/ = $frfr(tmpFree$1, h$3);
    const n$2 /*:primitive*/ = arr[32];
    const s$4 /*:primitive*/ = arr[86];
    const w$3 /*:primitive*/ = arr[87];
    const A$4 /*:primitive*/ = arr[30];
    const F$4 /*:primitive*/ = arr[356];
    const L$2 /*:boolean*/ = $frfr(tmpFree$2, a$3, f$4, j$4, n$2, s$4, w$3, A$4, F$4);
    if (L$2) {
      break loopStop;
    } else {
      const M$2 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$2);
    }
  } catch (P$2) {
    const N$2 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$2);
  }
  const tmpCalleeParam$4 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$4);
  const a$4 /*:primitive*/ = arr[286];
  const d$4 /*:primitive*/ = arr[181];
  try {
    const f$5 /*:number*/ = $frfr(tmpFree, d$4);
    const h$4 /*:primitive*/ = arr[308];
    const j$5 /*:number*/ = $frfr(tmpFree$1, h$4);
    const n$5 /*:primitive*/ = arr[32];
    const s$5 /*:primitive*/ = arr[86];
    const w$5 /*:primitive*/ = arr[87];
    const A$5 /*:primitive*/ = arr[30];
    const F$5 /*:primitive*/ = arr[356];
    const L$3 /*:boolean*/ = $frfr(tmpFree$2, a$4, f$5, j$5, n$5, s$5, w$5, A$5, F$5);
    if (L$3) {
      break loopStop;
    } else {
      const M$3 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$3);
    }
  } catch (P$3) {
    const N$3 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$3);
  }
  const tmpCalleeParam$5 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$5);
  const a$5 /*:primitive*/ = arr[286];
  const d$5 /*:primitive*/ = arr[181];
  try {
    const f$6 /*:number*/ = $frfr(tmpFree, d$5);
    const h$5 /*:primitive*/ = arr[308];
    const j$6 /*:number*/ = $frfr(tmpFree$1, h$5);
    const n$6 /*:primitive*/ = arr[32];
    const s$6 /*:primitive*/ = arr[86];
    const w$6 /*:primitive*/ = arr[87];
    const A$6 /*:primitive*/ = arr[30];
    const F$6 /*:primitive*/ = arr[356];
    const L$4 /*:boolean*/ = $frfr(tmpFree$2, a$5, f$6, j$6, n$6, s$6, w$6, A$6, F$6);
    if (L$4) {
      break loopStop;
    } else {
      const M$4 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$4);
    }
  } catch (P$4) {
    const N$4 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$4);
  }
  const tmpCalleeParam$6 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$6);
  const a$6 /*:primitive*/ = arr[286];
  const d$6 /*:primitive*/ = arr[181];
  try {
    const f$7 /*:number*/ = $frfr(tmpFree, d$6);
    const h$6 /*:primitive*/ = arr[308];
    const j$7 /*:number*/ = $frfr(tmpFree$1, h$6);
    const n$7 /*:primitive*/ = arr[32];
    const s$7 /*:primitive*/ = arr[86];
    const w$7 /*:primitive*/ = arr[87];
    const A$7 /*:primitive*/ = arr[30];
    const F$7 /*:primitive*/ = arr[356];
    const L$5 /*:boolean*/ = $frfr(tmpFree$2, a$6, f$7, j$7, n$7, s$7, w$7, A$7, F$7);
    if (L$5) {
      break loopStop;
    } else {
      const M$5 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$5);
    }
  } catch (P$5) {
    const N$5 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$5);
  }
  const tmpCalleeParam$7 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$7);
  const a$7 /*:primitive*/ = arr[286];
  const d$7 /*:primitive*/ = arr[181];
  try {
    const f$8 /*:number*/ = $frfr(tmpFree, d$7);
    const h$7 /*:primitive*/ = arr[308];
    const j$8 /*:number*/ = $frfr(tmpFree$1, h$7);
    const n$8 /*:primitive*/ = arr[32];
    const s$8 /*:primitive*/ = arr[86];
    const w$8 /*:primitive*/ = arr[87];
    const A$8 /*:primitive*/ = arr[30];
    const F$8 /*:primitive*/ = arr[356];
    const L$6 /*:boolean*/ = $frfr(tmpFree$2, a$7, f$8, j$8, n$8, s$8, w$8, A$8, F$8);
    if (L$6) {
      break loopStop;
    } else {
      const M$6 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$6);
    }
  } catch (P$6) {
    const N$6 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$6);
  }
  const tmpCalleeParam$8 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$8);
  const a$8 /*:primitive*/ = arr[286];
  const d$8 /*:primitive*/ = arr[181];
  try {
    const f$9 /*:number*/ = $frfr(tmpFree, d$8);
    const h$8 /*:primitive*/ = arr[308];
    const j$9 /*:number*/ = $frfr(tmpFree$1, h$8);
    const n$9 /*:primitive*/ = arr[32];
    const s$9 /*:primitive*/ = arr[86];
    const w$9 /*:primitive*/ = arr[87];
    const A$9 /*:primitive*/ = arr[30];
    const F$9 /*:primitive*/ = arr[356];
    const L$7 /*:boolean*/ = $frfr(tmpFree$2, a$8, f$9, j$9, n$9, s$9, w$9, A$9, F$9);
    if (L$7) {
      break loopStop;
    } else {
      const M$7 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$7);
    }
  } catch (P$7) {
    const N$7 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$7);
  }
  const tmpCalleeParam$9 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$9);
  const a$9 /*:primitive*/ = arr[286];
  const d$9 /*:primitive*/ = arr[181];
  try {
    const f$10 /*:number*/ = $frfr(tmpFree, d$9);
    const h$9 /*:primitive*/ = arr[308];
    const j$10 /*:number*/ = $frfr(tmpFree$1, h$9);
    const n$10 /*:primitive*/ = arr[32];
    const s$10 /*:primitive*/ = arr[86];
    const w$10 /*:primitive*/ = arr[87];
    const A$10 /*:primitive*/ = arr[30];
    const F$10 /*:primitive*/ = arr[356];
    const L$8 /*:boolean*/ = $frfr(tmpFree$2, a$9, f$10, j$10, n$10, s$10, w$10, A$10, F$10);
    if (L$8) {
      break loopStop;
    } else {
      const M$8 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$8);
    }
  } catch (P$8) {
    const N$8 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$8);
  }
  const tmpCalleeParam$10 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$10);
  const a$10 /*:primitive*/ = arr[286];
  const d$10 /*:primitive*/ = arr[181];
  try {
    const f$11 /*:number*/ = $frfr(tmpFree, d$10);
    const h$10 /*:primitive*/ = arr[308];
    const j$11 /*:number*/ = $frfr(tmpFree$1, h$10);
    const n$11 /*:primitive*/ = arr[32];
    const s$11 /*:primitive*/ = arr[86];
    const w$11 /*:primitive*/ = arr[87];
    const A$11 /*:primitive*/ = arr[30];
    const F$11 /*:primitive*/ = arr[356];
    const L$9 /*:boolean*/ = $frfr(tmpFree$2, a$10, f$11, j$11, n$11, s$11, w$11, A$11, F$11);
    if (L$9) {
      break loopStop;
    } else {
      const M$9 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$9);
    }
  } catch (P$9) {
    const N$9 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$9);
  }
  const tmpCalleeParam$11 /*:primitive*/ = arr[0];
  $(tmpCalleeParam$11);
  const a$11 /*:primitive*/ = arr[286];
  const d$11 /*:primitive*/ = arr[181];
  try {
    const f$12 /*:number*/ = $frfr(tmpFree, d$11);
    const h$11 /*:primitive*/ = arr[308];
    const j$12 /*:number*/ = $frfr(tmpFree$1, h$11);
    const n$12 /*:primitive*/ = arr[32];
    const s$12 /*:primitive*/ = arr[86];
    const w$12 /*:primitive*/ = arr[87];
    const A$12 /*:primitive*/ = arr[30];
    const F$12 /*:primitive*/ = arr[356];
    const L$10 /*:boolean*/ = $frfr(tmpFree$2, a$11, f$12, j$12, n$12, s$12, w$12, A$12, F$12);
    if (L$10) {
      break loopStop;
    } else {
      const M$10 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, M$10);
    }
  } catch (P$10) {
    const N$10 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, N$10);
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$12 /*:primitive*/ = arr[0];
    $(tmpCalleeParam$12);
    const a$12 /*:primitive*/ = arr[286];
    const d$12 /*:primitive*/ = arr[181];
    try {
      const f$13 /*:number*/ = $frfr(tmpFree, d$12);
      const h$12 /*:primitive*/ = arr[308];
      const j$13 /*:number*/ = $frfr(tmpFree$1, h$12);
      const n$13 /*:primitive*/ = arr[32];
      const s$13 /*:primitive*/ = arr[86];
      const w$13 /*:primitive*/ = arr[87];
      const A$13 /*:primitive*/ = arr[30];
      const F$13 /*:primitive*/ = arr[356];
      const L$11 /*:boolean*/ = $frfr(tmpFree$2, a$12, f$13, j$13, n$13, s$13, w$13, A$13, F$13);
      if (L$11) {
        break;
      } else {
        const M$11 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
        $dotCall($array_push, arr, `push`, M$11);
      }
    } catch (P$11) {
      const N$11 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, N$11);
    }
  }
}
const tmpCalleeParam$1 /*:primitive*/ = arr[0];
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$2 = function $free(a, f$1, j$2, n$3, s$1, w$4, A$1, F$2) {
  const b$4 = $Number_parseInt(a);
  const g$4 = f$1 / 2;
  const k$3 = j$2 / 3;
  const o$3 = $Number_parseInt(n$3);
  const c$3 = b$4 / 1;
  const l$2 = g$4 * k$3;
  const p$2 = -o$3;
  const m$3 = c$3 + l$2;
  const q$2 = p$2 / 4;
  const t$2 = $Number_parseInt(s$1);
  const r$4 = m$3 + q$2;
  const u$3 = t$2 / 5;
  const x$2 = $Number_parseInt(w$4);
  const B$1 = $Number_parseInt(A$1);
  const v = r$4 + u$3;
  const y = x$2 / 6;
  const C = -B$1;
  const G = $Number_parseInt(F$2);
  const z = v + y;
  const D = C / 7;
  const H = -G;
  const E = z + D;
  const tmpRet$2 = E + H / 8 === 644244;
  return tmpRet$2;
};
const tmpFree$1 = function $free(h) {
  const i = $Number_parseInt(h);
  const tmpRet$1 = -i;
  return tmpRet$1;
};
const tmpFree = function $free(d) {
  const e = $Number_parseInt(d);
  const tmpRet = -e;
  return tmpRet;
};
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
loopStop: {
  $(`a`);
  const a$1 = arr[286];
  const d$1 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$1, $frfr(tmpFree, d$1), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$2 = arr[286];
  const d$2 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$2, $frfr(tmpFree, d$2), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$1) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$3 = arr[286];
  const d$3 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$3, $frfr(tmpFree, d$3), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$2) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$4 = arr[286];
  const d$4 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$4, $frfr(tmpFree, d$4), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$3) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$5 = arr[286];
  const d$5 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$5, $frfr(tmpFree, d$5), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$4) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$6 = arr[286];
  const d$6 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$6, $frfr(tmpFree, d$6), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$5) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$7 = arr[286];
  const d$7 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$7, $frfr(tmpFree, d$7), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$6) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$8 = arr[286];
  const d$8 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$8, $frfr(tmpFree, d$8), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$7) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$9 = arr[286];
  const d$9 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$9, $frfr(tmpFree, d$9), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$8) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$10 = arr[286];
  const d$10 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$10, $frfr(tmpFree, d$10), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$9) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  $(arr[0]);
  const a$11 = arr[286];
  const d$11 = arr[181];
  try {
    if ($frfr(tmpFree$2, a$11, $frfr(tmpFree, d$11), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
      break loopStop;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  } catch (P$10) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  while (true) {
    $(arr[0]);
    const a$12 = arr[286];
    const d$12 = arr[181];
    try {
      if ($frfr(tmpFree$2, a$12, $frfr(tmpFree, d$12), $frfr(tmpFree$1, arr[308]), arr[32], arr[86], arr[87], arr[30], arr[356])) {
        break;
      } else {
        $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
      }
    } catch (P$11) {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
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
  const k = $Number_parseInt( c );
  const l = d / 2;
  const m = e / 3;
  const n = $Number_parseInt( f );
  const o = k / 1;
  const p = l * m;
  const q = -n;
  const r = o + p;
  const s = q / 4;
  const t = $Number_parseInt( g );
  const u = r + s;
  const v = t / 5;
  const w = $Number_parseInt( h );
  const x = $Number_parseInt( i );
  const y = u + v;
  const z = w / 6;
  const ba = -x;
  const bb = $Number_parseInt( j );
  const bc = y + z;
  const bd = ba / 7;
  const be = -bb;
  const bf = bc + bd;
  const bg = be / 8;
  const bh = bf + bg;
  const bi = bh === 644244;
  return bi;
};
const bj = function b($$0 ) {
  const bk = $$0;
  debugger;
  const bl = $Number_parseInt( bk );
  const bm = -bl;
  return bm;
};
const bn = function b($$0 ) {
  const bo = $$0;
  debugger;
  const bp = $Number_parseInt( bo );
  const bq = -bp;
  return bq;
};
const br = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
loopStop: {
  $( "a" );
  const bs = br[ 286 ];
  const bt = br[ 181 ];
  try {
    const bu = bv( bn, bt );
    const bw = br[ 308 ];
    const bx = bv( bj, bw );
    const by = br[ 32 ];
    const bz = br[ 86 ];
    const ca = br[ 87 ];
    const cb = br[ 30 ];
    const cc = br[ 356 ];
    const cd = bv( a, bs, bu, bx, by, bz, ca, cb, cc );
    if (cd) {
      break loopStop;
    }
    else {
      const ce = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", ce );
    }
  }
  catch (cf) {
    const cg = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", cg );
  }
  const ch = br[ 0 ];
  $( ch );
  const ci = br[ 286 ];
  const cj = br[ 181 ];
  try {
    const ck = bv( bn, cj );
    const cl = br[ 308 ];
    const cm = bv( bj, cl );
    const cn = br[ 32 ];
    const co = br[ 86 ];
    const cp = br[ 87 ];
    const cq = br[ 30 ];
    const cr = br[ 356 ];
    const cs = bv( a, ci, ck, cm, cn, co, cp, cq, cr );
    if (cs) {
      break loopStop;
    }
    else {
      const ct = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", ct );
    }
  }
  catch (cu) {
    const cv = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", cv );
  }
  const cw = br[ 0 ];
  $( cw );
  const cx = br[ 286 ];
  const cy = br[ 181 ];
  try {
    const cz = bv( bn, cy );
    const da = br[ 308 ];
    const db = bv( bj, da );
    const dc = br[ 32 ];
    const dd = br[ 86 ];
    const de = br[ 87 ];
    const df = br[ 30 ];
    const dg = br[ 356 ];
    const dh = bv( a, cx, cz, db, dc, dd, de, df, dg );
    if (dh) {
      break loopStop;
    }
    else {
      const di = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", di );
    }
  }
  catch (dj) {
    const dk = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", dk );
  }
  const dl = br[ 0 ];
  $( dl );
  const dm = br[ 286 ];
  const dn = br[ 181 ];
  try {
    const dp = bv( bn, dn );
    const dq = br[ 308 ];
    const dr = bv( bj, dq );
    const ds = br[ 32 ];
    const dt = br[ 86 ];
    const du = br[ 87 ];
    const dv = br[ 30 ];
    const dw = br[ 356 ];
    const dx = bv( a, dm, dp, dr, ds, dt, du, dv, dw );
    if (dx) {
      break loopStop;
    }
    else {
      const dy = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", dy );
    }
  }
  catch (dz) {
    const ea = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", ea );
  }
  const eb = br[ 0 ];
  $( eb );
  const ec = br[ 286 ];
  const ed = br[ 181 ];
  try {
    const ee = bv( bn, ed );
    const ef = br[ 308 ];
    const eg = bv( bj, ef );
    const eh = br[ 32 ];
    const ei = br[ 86 ];
    const ej = br[ 87 ];
    const ek = br[ 30 ];
    const el = br[ 356 ];
    const em = bv( a, ec, ee, eg, eh, ei, ej, ek, el );
    if (em) {
      break loopStop;
    }
    else {
      const en = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", en );
    }
  }
  catch (eo) {
    const ep = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", ep );
  }
  const eq = br[ 0 ];
  $( eq );
  const er = br[ 286 ];
  const es = br[ 181 ];
  try {
    const et = bv( bn, es );
    const eu = br[ 308 ];
    const ev = bv( bj, eu );
    const ew = br[ 32 ];
    const ex = br[ 86 ];
    const ey = br[ 87 ];
    const ez = br[ 30 ];
    const fa = br[ 356 ];
    const fb = bv( a, er, et, ev, ew, ex, ey, ez, fa );
    if (fb) {
      break loopStop;
    }
    else {
      const fc = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", fc );
    }
  }
  catch (fd) {
    const fe = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", fe );
  }
  const ff = br[ 0 ];
  $( ff );
  const fg = br[ 286 ];
  const fh = br[ 181 ];
  try {
    const fi = bv( bn, fh );
    const fj = br[ 308 ];
    const fk = bv( bj, fj );
    const fl = br[ 32 ];
    const fm = br[ 86 ];
    const fn = br[ 87 ];
    const fo = br[ 30 ];
    const fp = br[ 356 ];
    const fq = bv( a, fg, fi, fk, fl, fm, fn, fo, fp );
    if (fq) {
      break loopStop;
    }
    else {
      const fr = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", fr );
    }
  }
  catch (fs) {
    const ft = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", ft );
  }
  const fu = br[ 0 ];
  $( fu );
  const fv = br[ 286 ];
  const fw = br[ 181 ];
  try {
    const fx = bv( bn, fw );
    const fy = br[ 308 ];
    const fz = bv( bj, fy );
    const ga = br[ 32 ];
    const gb = br[ 86 ];
    const gc = br[ 87 ];
    const gd = br[ 30 ];
    const ge = br[ 356 ];
    const gf = bv( a, fv, fx, fz, ga, gb, gc, gd, ge );
    if (gf) {
      break loopStop;
    }
    else {
      const gg = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", gg );
    }
  }
  catch (gh) {
    const gi = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", gi );
  }
  const gj = br[ 0 ];
  $( gj );
  const gk = br[ 286 ];
  const gl = br[ 181 ];
  try {
    const gm = bv( bn, gl );
    const gn = br[ 308 ];
    const go = bv( bj, gn );
    const gp = br[ 32 ];
    const gq = br[ 86 ];
    const gr = br[ 87 ];
    const gs = br[ 30 ];
    const gt = br[ 356 ];
    const gu = bv( a, gk, gm, go, gp, gq, gr, gs, gt );
    if (gu) {
      break loopStop;
    }
    else {
      const gv = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", gv );
    }
  }
  catch (gw) {
    const gx = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", gx );
  }
  const gy = br[ 0 ];
  $( gy );
  const gz = br[ 286 ];
  const ha = br[ 181 ];
  try {
    const hb = bv( bn, ha );
    const hc = br[ 308 ];
    const hd = bv( bj, hc );
    const he = br[ 32 ];
    const hf = br[ 86 ];
    const hg = br[ 87 ];
    const hh = br[ 30 ];
    const hi = br[ 356 ];
    const hj = bv( a, gz, hb, hd, he, hf, hg, hh, hi );
    if (hj) {
      break loopStop;
    }
    else {
      const hk = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", hk );
    }
  }
  catch (hl) {
    const hm = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", hm );
  }
  const hn = br[ 0 ];
  $( hn );
  const ho = br[ 286 ];
  const hp = br[ 181 ];
  try {
    const hq = bv( bn, hp );
    const hr = br[ 308 ];
    const hs = bv( bj, hr );
    const ht = br[ 32 ];
    const hu = br[ 86 ];
    const hv = br[ 87 ];
    const hw = br[ 30 ];
    const hx = br[ 356 ];
    const hy = bv( a, ho, hq, hs, ht, hu, hv, hw, hx );
    if (hy) {
      break loopStop;
    }
    else {
      const hz = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", hz );
    }
  }
  catch (ia) {
    const ib = $dotCall( $array_shift, br, "shift" );
    $dotCall( $array_push, br, "push", ib );
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const ic = br[ 0 ];
    $( ic );
    const id = br[ 286 ];
    const ie = br[ 181 ];
    try {
      const ig = bv( bn, ie );
      const ih = br[ 308 ];
      const ii = bv( bj, ih );
      const ij = br[ 32 ];
      const ik = br[ 86 ];
      const il = br[ 87 ];
      const im = br[ 30 ];
      const io = br[ 356 ];
      const ip = bv( a, id, ig, ii, ij, ik, il, im, io );
      if (ip) {
        break;
      }
      else {
        const iq = $dotCall( $array_shift, br, "shift" );
        $dotCall( $array_push, br, "push", iq );
      }
    }
    catch (ir) {
      const is = $dotCall( $array_shift, br, "shift" );
      $dotCall( $array_push, br, "push", is );
    }
  }
}
const it = br[ 0 ];
$( it );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  let tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
  try {
    const a = arr[286];
    const b = $Number_parseInt(a);
    const c = b / 1;
    const d = arr[181];
    const e = $Number_parseInt(d);
    const f = -e;
    const g = f / 2;
    const h = arr[308];
    const i = $Number_parseInt(h);
    const j = -i;
    const k = j / 3;
    const l = g * k;
    const m = c + l;
    const n = arr[32];
    const o = $Number_parseInt(n);
    const p = -o;
    const q = p / 4;
    const r = m + q;
    const s = arr[86];
    const t = $Number_parseInt(s);
    const u = t / 5;
    const v = r + u;
    const w = arr[87];
    const x = $Number_parseInt(w);
    const y = x / 6;
    const z = v + y;
    const A = arr[30];
    const B = $Number_parseInt(A);
    const C = -B;
    const D = C / 7;
    const E = z + D;
    const F = arr[356];
    const G = $Number_parseInt(F);
    const H = -G;
    const I = H / 8;
    const K = E + I;
    const L = K === 644244;
    if (L) {
      break;
    } else {
      const tmpMCF = arr.shift;
      const M = $dotCall(tmpMCF, arr, `shift`);
      const tmpMCF$1 = arr.push;
      $dotCall(tmpMCF$1, arr, `push`, M);
    }
  } catch (P) {
    const tmpMCF$3 = arr.shift;
    const N = $dotCall(tmpMCF$3, arr, `shift`);
    const tmpMCF$5 = arr.push;
    $dotCall(tmpMCF$5, arr, `push`, N);
  }
}
let tmpCalleeParam$1 = arr[0];
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Record this phase1.1 as a test case, please (A)
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


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
