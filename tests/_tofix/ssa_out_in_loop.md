# Preval test case

# ssa_out_in_loop.md

> Tofix > ssa out in loop
>
> A and B should be SSA'd and their first occurrence should be removed
> because they're never read. But the loop is making that harder.

## Input

`````js filename=intro
{
  if ($) {
    let A = `jhayon.vercel.app`;
    let B = `jhayon.vercel.app`;
    let one = 1;
    const ex = $('x');
    while ($LOOP_UNROLL_5) {
      const test = one < 1;
        A = ex.length;
        const first = A[0];
        const isdot = first === `.`;
        if (isdot) {
          B = A.slice(1);
        } else {
          B = A;
        }
        const tmpClusterSSA__0x26b289 = $('abc');
        const len = tmpClusterSSA__0x26b289.length;
        const len2 = B.length;
        const tmpClusterSSA__0x30c47e = len - len2;
        const tmpClusterSSA__0x2a669d = tmpClusterSSA__0x26b289.indexOf(B, tmpClusterSSA__0x30c47e);
        const tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== (-1);
        if (tmpClusterSSA__0x5dc746) {
          const tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
          if (tmpClusterSSA__0x5dc746) {
            const tmpBinBothLhs$34 = tmpClusterSSA__0x26b289.length;
            const tmpBinBothRhs$34 = A.length;
          } else {

          }
        } else {

        }
        one = one + 1;
        break;
    }
  } else {
  }
}
`````


## Settled


`````js filename=intro
if ($) {
  let B /*:unknown*/ /*ternaryConst*/ = `jhayon.vercel.app`;
  const ex /*:unknown*/ = $(`x`);
  const A /*:unknown*/ = ex.length;
  const first /*:unknown*/ = A[0];
  const isdot /*:boolean*/ = first === `.`;
  if (isdot) {
    const tmpMCF /*:unknown*/ = A.slice;
    B = $dotCall(tmpMCF, A, `slice`, 1);
  } else {
    B = A;
  }
  const tmpClusterSSA__0x26b289 /*:unknown*/ = $(`abc`);
  const len /*:unknown*/ = tmpClusterSSA__0x26b289.length;
  const len2 /*:unknown*/ = B.length;
  const tmpClusterSSA__0x30c47e /*:number*/ = len - len2;
  const tmpMCF$1 /*:unknown*/ = tmpClusterSSA__0x26b289.indexOf;
  const tmpClusterSSA__0x2a669d /*:unknown*/ = $dotCall(tmpMCF$1, tmpClusterSSA__0x26b289, `indexOf`, B, tmpClusterSSA__0x30c47e);
  const tmpClusterSSA__0x5dc746 /*:boolean*/ = tmpClusterSSA__0x2a669d === -1;
  if (tmpClusterSSA__0x5dc746) {
  } else {
    const tmpClusterSSA__0x5dc746$1 /*:boolean*/ = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
    if (tmpClusterSSA__0x5dc746$1) {
      tmpClusterSSA__0x26b289.length;
      A.length;
    } else {
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let B = `jhayon.vercel.app`;
  const A = $(`x`).length;
  if (A[0] === `.`) {
    B = A.slice(1);
  } else {
    B = A;
  }
  const tmpClusterSSA__0x26b289 = $(`abc`);
  const tmpClusterSSA__0x30c47e = tmpClusterSSA__0x26b289.length - B.length;
  const tmpClusterSSA__0x2a669d = tmpClusterSSA__0x26b289.indexOf(B, tmpClusterSSA__0x30c47e);
  if (!(tmpClusterSSA__0x2a669d === -1)) {
    if (tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e) {
      tmpClusterSSA__0x26b289.length;
      A.length;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app";
  const b = $( "x" );
  const c = b.length;
  const d = c[ 0 ];
  const e = d === ".";
  if (e) {
    const f = c.slice;
    a = $dotCall( f, c, "slice", 1 );
  }
  else {
    a = c;
  }
  const g = $( "abc" );
  const h = g.length;
  const i = a.length;
  const j = h - i;
  const k = g.indexOf;
  const l = $dotCall( k, g, "indexOf", a, j );
  const m = l === -1;
  if (m) {

  }
  else {
    const n = l === j;
    if (n) {
      g.length;
      c.length;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if ($) {
  let A = `jhayon.vercel.app`;
  let B = `jhayon.vercel.app`;
  let one = 1;
  const ex = $(`x`);
  const test = one < 1;
  A = ex.length;
  const first = A[0];
  const isdot = first === `.`;
  if (isdot) {
    const tmpMCF = A.slice;
    B = $dotCall(tmpMCF, A, `slice`, 1);
  } else {
    B = A;
  }
  const tmpClusterSSA__0x26b289 = $(`abc`);
  const len = tmpClusterSSA__0x26b289.length;
  const len2 = B.length;
  const tmpClusterSSA__0x30c47e = len - len2;
  const tmpMCF$1 = tmpClusterSSA__0x26b289.indexOf;
  const tmpClusterSSA__0x2a669d = $dotCall(tmpMCF$1, tmpClusterSSA__0x26b289, `indexOf`, B, tmpClusterSSA__0x30c47e);
  const tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
  if (tmpClusterSSA__0x5dc746) {
    const tmpClusterSSA__0x5dc746$1 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
    if (tmpClusterSSA__0x5dc746$1) {
      const tmpBinBothLhs$34 = tmpClusterSSA__0x26b289.length;
      const tmpBinBothRhs$34 = A.length;
    } else {
    }
  } else {
  }
  one = one + 1;
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
