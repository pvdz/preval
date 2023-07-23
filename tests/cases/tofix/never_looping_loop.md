# Preval test case

# never_looping_loop.md

> Tofix > Never looping loop
>
> A loop that never loops should not be a loop
> We can fix this when our loops are while(true) and they guarantee to break at the end of every branching path

## Input

`````js filename=intro
{
  if ($) {
    let A = `jhayon.vercel.app`;
    let B = `jhayon.vercel.app`;
    let tmpClusterSSA__0x2c65c8$1 = 1;
    const tmpClusterSSA__0x15f773 = $('x');
    while ($LOOP_UNROLL_500) {
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

## Pre Normal

`````js filename=intro
{
  if ($) {
    let A = `jhayon.vercel.app`;
    let B = `jhayon.vercel.app`;
    let tmpClusterSSA__0x2c65c8$1 = 1;
    const tmpClusterSSA__0x15f773 = $(`x`);
    while ($LOOP_UNROLL_500) {
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
      tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
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

## Normalized

`````js filename=intro
if ($) {
  let A = `jhayon.vercel.app`;
  let B = `jhayon.vercel.app`;
  let tmpClusterSSA__0x2c65c8$1 = 1;
  const tmpClusterSSA__0x15f773 = $(`x`);
  while ($LOOP_UNROLL_500) {
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
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
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
`````

## Output

`````js filename=intro
if ($) {
  let A = `jhayon.vercel.app`;
  let B = `jhayon.vercel.app`;
  let tmpClusterSSA__0x2c65c8$1 = 1;
  const tmpClusterSSA__0x15f773 = $(`x`);
  while ($LOOP_UNROLL_500) {
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
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
    if (tmpClusterSSA__0x5dc746) {
      tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
      if (tmpClusterSSA__0x5dc746) {
        const tmpBinBothLhs$34 = tmpClusterSSA__0x26b289.length;
        const tmpBinBothRhs$34 = A.length;
        const tmpIfTest$12 = tmpBinBothLhs$34 === tmpBinBothRhs$34;
        if (tmpIfTest$12) {
        } else {
          A.indexOf(`.`);
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
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app";
  let b = "jhayon.vercel.app";
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.length;
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const g = tmpClusterSSA__0x26b289.length;
    const h = b.length;
    tmpClusterSSA__0x30c47e = g - h;
    tmpClusterSSA__0x2a669d = tmpClusterSSA__0x26b289.indexOf( b, tmpClusterSSA__0x30c47e );
    tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d !== -1;
    if (tmpClusterSSA__0x5dc746) {
      tmpClusterSSA__0x5dc746 = tmpClusterSSA__0x2a669d === tmpClusterSSA__0x30c47e;
      if (tmpClusterSSA__0x5dc746) {
        const i = tmpClusterSSA__0x26b289.length;
        const j = a.length;
        const k = i === j;
        if (k) {

        }
        else {
          a.indexOf( "." );
        }
      }
    }
    c = c + 1;
    break;
  }
}
`````

## Globals

BAD@! Found 4 implicit global bindings:

tmpClusterSSA__0x26b289, tmpClusterSSA__0x30c47e, tmpClusterSSA__0x2a669d, tmpClusterSSA__0x5dc746

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same