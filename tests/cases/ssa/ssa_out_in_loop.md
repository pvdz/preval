# Preval test case

# ssa_out_in_loop.md

> Ssa > Ssa out in loop
>
> A and B should be SSA'd and their first occurrence should be removed because they're never read. But the loop is making that harder.

## Input

`````js filename=intro
{
  if ($) {
    let A = `jhayon.vercel.app`;
    let B = `jhayon.vercel.app`;
    let tmpClusterSSA__0x2c65c8$1 = 1;
    const tmpClusterSSA__0x15f773 = $('x');
    while ($LOOP_UNROLLS_LEFT_500) {
      const tmpIfTest$8 = tmpClusterSSA__0x2c65c8$1 < 1;
        A = tmpClusterSSA__0x15f773.length;
        const tmpBinBothLhs$30 = A[0];
        const tmpIfTest$10 = tmpBinBothLhs$30 === `.`;
        if (tmpIfTest$10) {
          B = A.slice(1);
        } else {
          B = A;
        }
        const tmpBinBothLhs$32 = tmpClusterSSA__0x26b289.length;
        const tmpBinBothRhs$32 = B.length;
        tmpClusterSSA__0x30c47e = tmpBinBothLhs$32 - tmpBinBothRhs$32;
        tmpClusterSSA__0x2a669d = tmpClusterSSA__0x26b289.indexOf(B, tmpClusterSSA__0x30c47e);
        tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== (-1);
        if (tmpClusterSSA__0x5dc746) {
          tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
          if (tmpClusterSSA__0x5dc746) {
            const tmpBinBothLhs$34 = tmpClusterSSA__0x26b289.length;
            const tmpBinBothRhs$34 = A.length;
            let tmpIfTest$12 = tmpBinBothLhs$34 === tmpBinBothRhs$34;
            if (tmpIfTest$12) {

            } else {
              const tmpBinLhs$23 = A.indexOf(`.`);
              tmpIfTest$12 = tmpBinLhs$23 === 0;
            }
          } else {

          }
        } else {

        }
        tmpClusterSSA__0x2c65c8$1 = tmpClusterSSA__0x2c65c8$1 + 1;
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
  const tmpClusterSSA__0x15f773 /*:unknown*/ = $(`x`);
  const A /*:unknown*/ = tmpClusterSSA__0x15f773.length;
  const tmpBinBothLhs$30 /*:unknown*/ = A[0];
  const tmpIfTest$10 /*:boolean*/ = tmpBinBothLhs$30 === `.`;
  if (tmpIfTest$10) {
    const tmpMCF /*:unknown*/ = A.slice;
    B = $dotCall(tmpMCF, A, `slice`, 1);
  } else {
    B = A;
  }
  const tmpBinBothLhs$32 /*:unknown*/ = tmpClusterSSA__0x26b289.length;
  const tmpBinBothRhs$32 /*:unknown*/ = B.length;
  tmpClusterSSA__0x30c47e = tmpBinBothLhs$32 - tmpBinBothRhs$32;
  const tmpMCF$1 /*:unknown*/ = tmpClusterSSA__0x26b289.indexOf;
  tmpClusterSSA__0x2a669d = $dotCall(tmpMCF$1, tmpClusterSSA__0x26b289, `indexOf`, B, tmpClusterSSA__0x30c47e);
  tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
  if (tmpClusterSSA__0x5dc746) {
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
    if (tmpClusterSSA__0x5dc746) {
      const tmpBinBothLhs$34 /*:unknown*/ = tmpClusterSSA__0x26b289.length;
      const tmpBinBothRhs$34 /*:unknown*/ = A.length;
      const tmpIfTest$12 /*:boolean*/ = tmpBinBothLhs$34 === tmpBinBothRhs$34;
      if (tmpIfTest$12) {
      } else {
        const tmpMCF$3 /*:unknown*/ = A.indexOf;
        $dotCall(tmpMCF$3, A, `indexOf`, `.`);
      }
    } else {
    }
  } else {
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
  tmpClusterSSA__0x30c47e = tmpClusterSSA__0x26b289.length - B.length;
  tmpClusterSSA__0x2a669d = tmpClusterSSA__0x26b289.indexOf(B, tmpClusterSSA__0x30c47e);
  tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
  if (tmpClusterSSA__0x5dc746) {
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
    if (tmpClusterSSA__0x5dc746) {
      const tmpBinBothLhs$34 = tmpClusterSSA__0x26b289.length;
      if (!(tmpBinBothLhs$34 === A.length)) {
        A.indexOf(`.`);
      }
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
  const g = tmpClusterSSA__0x26b289.length;
  const h = a.length;
  tmpClusterSSA__0x30c47e = g - h;
  const i = tmpClusterSSA__0x26b289.indexOf;
  tmpClusterSSA__0x2a669d = $dotCall( i, tmpClusterSSA__0x26b289, "indexOf", a, tmpClusterSSA__0x30c47e );
  tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
  if (tmpClusterSSA__0x5dc746) {
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
    if (tmpClusterSSA__0x5dc746) {
      const j = tmpClusterSSA__0x26b289.length;
      const k = c.length;
      const l = j === k;
      if (l) {

      }
      else {
        const m = c.indexOf;
        $dotCall( m, c, "indexOf", "." );
      }
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
  let tmpClusterSSA__0x2c65c8$1 = 1;
  const tmpClusterSSA__0x15f773 = $(`x`);
  const tmpIfTest$8 = tmpClusterSSA__0x2c65c8$1 < 1;
  A = tmpClusterSSA__0x15f773.length;
  const tmpBinBothLhs$30 = A[0];
  const tmpIfTest$10 = tmpBinBothLhs$30 === `.`;
  if (tmpIfTest$10) {
    const tmpMCF = A.slice;
    B = $dotCall(tmpMCF, A, `slice`, 1);
  } else {
    B = A;
  }
  const tmpBinBothLhs$32 = tmpClusterSSA__0x26b289.length;
  const tmpBinBothRhs$32 = B.length;
  tmpClusterSSA__0x30c47e = tmpBinBothLhs$32 - tmpBinBothRhs$32;
  const tmpMCF$1 = tmpClusterSSA__0x26b289.indexOf;
  tmpClusterSSA__0x2a669d = $dotCall(tmpMCF$1, tmpClusterSSA__0x26b289, `indexOf`, B, tmpClusterSSA__0x30c47e);
  tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
  if (tmpClusterSSA__0x5dc746) {
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
    if (tmpClusterSSA__0x5dc746) {
      const tmpBinBothLhs$34 = tmpClusterSSA__0x26b289.length;
      const tmpBinBothRhs$34 = A.length;
      let tmpIfTest$12 = tmpBinBothLhs$34 === tmpBinBothRhs$34;
      if (tmpIfTest$12) {
      } else {
        const tmpMCF$3 = A.indexOf;
        const tmpBinLhs$23 = $dotCall(tmpMCF$3, A, `indexOf`, `.`);
        tmpIfTest$12 = tmpBinLhs$23 === 0;
      }
    } else {
    }
  } else {
  }
  tmpClusterSSA__0x2c65c8$1 = tmpClusterSSA__0x2c65c8$1 + 1;
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 4 implicit global bindings:

tmpClusterSSA__0x26b289, tmpClusterSSA__0x30c47e, tmpClusterSSA__0x2a669d, tmpClusterSSA__0x5dc746


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
