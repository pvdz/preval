# Preval test case

# never_looping_loop.md

> While > Never looping loop
>
> A loop that never loops should not be a loop

## Input

`````js filename=intro
{
  if ($) {
    let A = `jhayon.vercel.app`;
    let B = `jhayon.vercel.app`;
    let y = 1;
    const x = $('x');
    while (true) {
      A = x.length;
      const tmpBinBothLhs$30 = A[0];
      const tmpIfTest$10 = tmpBinBothLhs$30 === `.`;
      if (tmpIfTest$10) {
        B = A.slice(1);
      } else {
        B = A;
      }
      const len = $.length;
      const len2 = B.length;
      let diff = len - len2;
      let pos = $.indexOf(B, diff);
      let isnot = pos !== (-1);
      if (isnot) {
        isnot = pos === diff;
        if (isnot) {
          const len3 = $.length;
          const lena2 = A.length;
          let isa2 = len3 === lena2;
          if (isa2) {

          } else {
            const pos4 = A.indexOf(`.`);
            isa2 = pos4 === 0;
          }
        } else {

        }
      } else {

      }
      y = y + 1;
      break;
    }
  } else {
  }
}
`````


## Settled


`````js filename=intro
if ($) {
  let B /*:unknown*/ = `jhayon.vercel.app`;
  const x /*:unknown*/ = $(`x`);
  const A /*:unknown*/ = x.length;
  const tmpBinBothLhs$30 /*:unknown*/ = A[0];
  const tmpIfTest$10 /*:boolean*/ = tmpBinBothLhs$30 === `.`;
  if (tmpIfTest$10) {
    B = A.slice(1);
  } else {
    B = A;
  }
  const len /*:unknown*/ = $.length;
  const len2 /*:unknown*/ = B.length;
  const diff /*:number*/ = len - len2;
  const pos /*:unknown*/ = $.indexOf(B, diff);
  const isnot /*:boolean*/ = pos === -1;
  if (isnot) {
  } else {
    const tmpClusterSSA_isnot /*:boolean*/ = pos === diff;
    if (tmpClusterSSA_isnot) {
      const len3 /*:unknown*/ = $.length;
      const lena2 /*:unknown*/ = A.length;
      const isa2 /*:boolean*/ = len3 === lena2;
      if (isa2) {
      } else {
        A.indexOf(`.`);
      }
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
  const diff = $.length - B.length;
  const pos = $.indexOf(B, diff);
  if (!(pos === -1)) {
    if (pos === diff) {
      const len3 = $.length;
      if (!(len3 === A.length)) {
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
    a = c.slice( 1 );
  }
  else {
    a = c;
  }
  const f = $.length;
  const g = a.length;
  const h = f - g;
  const i = $.indexOf( a, h );
  const j = i === -1;
  if (j) {

  }
  else {
    const k = i === h;
    if (k) {
      const l = $.length;
      const m = c.length;
      const n = l === m;
      if (n) {

      }
      else {
        c.indexOf( "." );
      }
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
