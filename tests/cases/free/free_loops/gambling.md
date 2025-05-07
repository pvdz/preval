# Preval test case

# gambling.md

> Free > Free loops > Gambling

This is a snippet from a gambling website. It's just mashing an array of characters (the real array was 8k).
This whole loop is predictable and that's what this test is supposed to show.
(You can set the counter to 100k if you want the real thing.)

## Input

`````js filename=intro
{
  
  const tmpFree/*:(number, number)=>number*/ = function $free(tmpBinLhs$9/*:number*/, tmpBinBothRhs$5/*:number*/) {
    const tmpRet/*:number*/ = (tmpBinLhs$9 << 11) | tmpBinBothRhs$5;
    return tmpRet;
  };
  
  let i = 0; // hmm? is this missing from the original?
  let a = undefined;
  let hoezithetmetdezeb = undefined;
  let counter_a/*:number*/ = 4;
  let counter_b/*:number*/ = 0;
  const dataarray/*:array*/ = [0, 1, 2, 3, 47, 47, 192, 13, 10, 40, 31337, 221, 218, 39, 1, 5, 2, 13];
  const nudan/*:array*/ = [35, 48, 72, 128];
  const output_array/*:array*/ = [];
  while (true) {
    //if (counter_a < 106192) {
    if (counter_a < 92) {
      const tmpPostUpdArgIdent$3 = counter_a;
      counter_a = counter_a + 1;
      const tmpClusterSSA_b = dataarray[tmpPostUpdArgIdent$3];
      let tmpIfTest$9/*:boolean*/ = tmpClusterSSA_b === 0;
      if (!tmpIfTest$9) {
        tmpIfTest$9 = tmpClusterSSA_b === 1;
        if (!tmpIfTest$9) {
          tmpIfTest$9 = tmpClusterSSA_b === 2;
          if (!tmpIfTest$9) {
            tmpIfTest$9 = tmpClusterSSA_b === 3;
          }
        }
      }
      if (tmpIfTest$9) {
        const tmpPostUpdArgIdent$7 = counter_a;
        counter_a = counter_a + 1;
        const tmpClusterSSA_a$1 = dataarray[tmpPostUpdArgIdent$7];
        if (tmpClusterSSA_a$1) {
          if (tmpClusterSSA_b === 0) {
            hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
            const tmpClusterSSA_c/*:number*/ = counter_a + 1;
            const tmpClusterSSA_h = dataarray[counter_a];
            counter_a = tmpClusterSSA_c + 1;
            const tmpClusterSSA_m = dataarray[tmpClusterSSA_c];
            const tmpBinLhs$1/*:number*/ = tmpClusterSSA_a$1 & 224;
            const tmp2 = tmpClusterSSA_h << 8;
            const tmp = $frfr(tmpFree, tmpBinLhs$1, tmp2);
            a = (tmp | tmpClusterSSA_m) + 2056;
          } else {
            if (tmpClusterSSA_b === 1) {
              hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
              const tmpPostUpdArgIdent$13 = counter_a;
              counter_a = counter_a + 1;
              const tmpClusterSSA_h$1 = dataarray[tmpPostUpdArgIdent$13];
              a = (((tmpClusterSSA_a$1 & 224) << 3) | tmpClusterSSA_h$1) + 8;
            } else {
              if (tmpClusterSSA_b === 2) {
                hoezithetmetdezeb = (tmpClusterSSA_a$1 >> 6) + 1;
                a = (tmpClusterSSA_a$1 & 63) + 8;
              } else {
                hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
                a = (tmpClusterSSA_a$1 >> 5) + 1;
              }
            }
          }
          if (hoezithetmetdezeb < 28) {
            hoezithetmetdezeb = hoezithetmetdezeb + 2;
          } else {
            const tmpAssignRhsCompProp$9/*:number*/ = hoezithetmetdezeb - 28;
            hoezithetmetdezeb = nudan[tmpAssignRhsCompProp$9];
          }
          i = 0;
          if (i < hoezithetmetdezeb) {
            const tmpCompProp/*:number*/ = counter_b - a;
            const tmpAssignComputedRhs = output_array[tmpCompProp];
            output_array[counter_b] = tmpAssignComputedRhs;
            counter_b = counter_b + 1;
            i = i + 1;
            while (true) {
              if (i < hoezithetmetdezeb) {
                const tmpCompProp$1/*:number*/ = counter_b - a;
                const tmpAssignComputedRhs$1 = output_array[tmpCompProp$1];
                output_array[counter_b] = tmpAssignComputedRhs$1;
                counter_b = counter_b + 1;
                i = i + 1;
              } else {
                break;
              }
            }
          }
        } else {
          const tmpPostUpdArgIdent$19 = counter_b;
          counter_b = counter_b + 1;
          output_array[tmpPostUpdArgIdent$19] = tmpClusterSSA_b;
        }
      } else {
        const tmpPostUpdArgIdent$5 = counter_b;
        counter_b = counter_b + 1;
        output_array[tmpPostUpdArgIdent$5] = tmpClusterSSA_b;
      }
    } else {
      break;
    }
  }
  $(output_array.join(``));
}
`````


## Settled


`````js filename=intro
$(`4747192131040313372212183947471921310403133713`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`4747192131040313372212183947471921310403133713`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "4747192131040313372212183947471921310403133713" );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '4747192131040313372212183947471921310403133713'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
