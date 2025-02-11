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
            a = ($frfr(tmpFree, tmpBinLhs$1, tmpClusterSSA_h << 8) | tmpClusterSSA_m) + 2056;
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

## Pre Normal


`````js filename=intro
{
  const tmpFree = function $free($$0, $$1) {
    let tmpBinLhs$9 = $$0;
    let tmpBinBothRhs$5 = $$1;
    debugger;
    const tmpRet = (tmpBinLhs$9 << 11) | tmpBinBothRhs$5;
    return tmpRet;
  };
  let i = 0;
  let a = undefined;
  let hoezithetmetdezeb = undefined;
  let counter_a = 4;
  let counter_b = 0;
  const dataarray = [0, 1, 2, 3, 47, 47, 192, 13, 10, 40, 31337, 221, 218, 39, 1, 5, 2, 13];
  const nudan = [35, 48, 72, 128];
  const output_array = [];
  while (true) {
    if (counter_a < 92) {
      const tmpPostUpdArgIdent$3 = counter_a;
      counter_a = counter_a + 1;
      const tmpClusterSSA_b = dataarray[tmpPostUpdArgIdent$3];
      let tmpIfTest$9 = tmpClusterSSA_b === 0;
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
            const tmpClusterSSA_c = counter_a + 1;
            const tmpClusterSSA_h = dataarray[counter_a];
            counter_a = tmpClusterSSA_c + 1;
            const tmpClusterSSA_m = dataarray[tmpClusterSSA_c];
            const tmpBinLhs$1 = tmpClusterSSA_a$1 & 224;
            a = ($frfr(tmpFree, tmpBinLhs$1, tmpClusterSSA_h << 8) | tmpClusterSSA_m) + 2056;
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
            const tmpAssignRhsCompProp$9 = hoezithetmetdezeb - 28;
            hoezithetmetdezeb = nudan[tmpAssignRhsCompProp$9];
          }
          i = 0;
          if (i < hoezithetmetdezeb) {
            const tmpCompProp = counter_b - a;
            const tmpAssignComputedRhs = output_array[tmpCompProp];
            output_array[counter_b] = tmpAssignComputedRhs;
            counter_b = counter_b + 1;
            i = i + 1;
            while (true) {
              if (i < hoezithetmetdezeb) {
                const tmpCompProp$1 = counter_b - a;
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

## Normalized


`````js filename=intro
const tmpFree = function $free($$0, $$1) {
  let tmpBinLhs$9 = $$0;
  let tmpBinBothRhs$5 = $$1;
  debugger;
  const tmpBinLhs = tmpBinLhs$9 << 11;
  const tmpRet = tmpBinLhs | tmpBinBothRhs$5;
  return tmpRet;
};
let i = 0;
let a = undefined;
let hoezithetmetdezeb = undefined;
let counter_a = 4;
let counter_b = 0;
const dataarray = [0, 1, 2, 3, 47, 47, 192, 13, 10, 40, 31337, 221, 218, 39, 1, 5, 2, 13];
const nudan = [35, 48, 72, 128];
const output_array = [];
while (true) {
  const tmpIfTest = counter_a < 92;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent$3 = counter_a;
    counter_a = counter_a + 1;
    const tmpClusterSSA_b = dataarray[tmpPostUpdArgIdent$3];
    let tmpIfTest$9 = tmpClusterSSA_b === 0;
    if (tmpIfTest$9) {
    } else {
      tmpIfTest$9 = tmpClusterSSA_b === 1;
      if (tmpIfTest$9) {
      } else {
        tmpIfTest$9 = tmpClusterSSA_b === 2;
        if (tmpIfTest$9) {
        } else {
          tmpIfTest$9 = tmpClusterSSA_b === 3;
        }
      }
    }
    if (tmpIfTest$9) {
      const tmpPostUpdArgIdent$7 = counter_a;
      counter_a = counter_a + 1;
      const tmpClusterSSA_a$1 = dataarray[tmpPostUpdArgIdent$7];
      if (tmpClusterSSA_a$1) {
        const tmpIfTest$1 = tmpClusterSSA_b === 0;
        if (tmpIfTest$1) {
          hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
          const tmpClusterSSA_c = counter_a + 1;
          const tmpClusterSSA_h = dataarray[counter_a];
          counter_a = tmpClusterSSA_c + 1;
          const tmpClusterSSA_m = dataarray[tmpClusterSSA_c];
          const tmpBinLhs$1 = tmpClusterSSA_a$1 & 224;
          const tmpCallCallee = $frfr;
          const tmpCalleeParam = tmpFree;
          const tmpCalleeParam$1 = tmpBinLhs$1;
          const tmpCalleeParam$3 = tmpClusterSSA_h << 8;
          const tmpBinLhs$4 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
          const tmpBinLhs$2 = tmpBinLhs$4 | tmpClusterSSA_m;
          a = tmpBinLhs$2 + 2056;
        } else {
          const tmpIfTest$3 = tmpClusterSSA_b === 1;
          if (tmpIfTest$3) {
            hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
            const tmpPostUpdArgIdent$13 = counter_a;
            counter_a = counter_a + 1;
            const tmpClusterSSA_h$1 = dataarray[tmpPostUpdArgIdent$13];
            const tmpBinLhs$10 = tmpClusterSSA_a$1 & 224;
            const tmpBinLhs$8 = tmpBinLhs$10 << 3;
            const tmpBinLhs$6 = tmpBinLhs$8 | tmpClusterSSA_h$1;
            a = tmpBinLhs$6 + 8;
          } else {
            const tmpIfTest$5 = tmpClusterSSA_b === 2;
            if (tmpIfTest$5) {
              const tmpBinLhs$12 = tmpClusterSSA_a$1 >> 6;
              hoezithetmetdezeb = tmpBinLhs$12 + 1;
              const tmpBinLhs$14 = tmpClusterSSA_a$1 & 63;
              a = tmpBinLhs$14 + 8;
            } else {
              hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
              const tmpBinLhs$16 = tmpClusterSSA_a$1 >> 5;
              a = tmpBinLhs$16 + 1;
            }
          }
        }
        const tmpIfTest$7 = hoezithetmetdezeb < 28;
        if (tmpIfTest$7) {
          hoezithetmetdezeb = hoezithetmetdezeb + 2;
        } else {
          const tmpAssignRhsCompProp$9 = hoezithetmetdezeb - 28;
          hoezithetmetdezeb = nudan[tmpAssignRhsCompProp$9];
        }
        i = 0;
        const tmpIfTest$10 = i < hoezithetmetdezeb;
        if (tmpIfTest$10) {
          const tmpCompProp = counter_b - a;
          const tmpAssignComputedRhs = output_array[tmpCompProp];
          output_array[counter_b] = tmpAssignComputedRhs;
          counter_b = counter_b + 1;
          i = i + 1;
          while (true) {
            const tmpIfTest$12 = i < hoezithetmetdezeb;
            if (tmpIfTest$12) {
              const tmpCompProp$1 = counter_b - a;
              const tmpAssignComputedRhs$1 = output_array[tmpCompProp$1];
              output_array[counter_b] = tmpAssignComputedRhs$1;
              counter_b = counter_b + 1;
              i = i + 1;
            } else {
              break;
            }
          }
        } else {
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
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = output_array.join(``);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const tmpFree /*:(unknown, unknown)=>number*/ = function $free($$0, $$1) {
  const tmpBinLhs$9 = $$0;
  const tmpBinBothRhs$5 = $$1;
  debugger;
  const tmpBinLhs /*:number*/ = tmpBinLhs$9 << 11;
  const tmpRet /*:number*/ = tmpBinLhs | tmpBinBothRhs$5;
  return tmpRet;
};
let a /*:primitive*/ = undefined;
let hoezithetmetdezeb = undefined;
let counter_a /*:number*/ = 4;
let counter_b /*:number*/ = 0;
const dataarray /*:array*/ = [0, 1, 2, 3, 47, 47, 192, 13, 10, 40, 31337, 221, 218, 39, 1, 5, 2, 13];
const nudan /*:array*/ = [35, 48, 72, 128];
const output_array /*:array*/ = [];
while (true) {
  const tmpIfTest /*:boolean*/ = counter_a < 92;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent$3 = counter_a;
    counter_a = counter_a + 1;
    const tmpClusterSSA_b = dataarray[tmpPostUpdArgIdent$3];
    let tmpIfTest$9 /*:boolean*/ = tmpClusterSSA_b === 0;
    if (tmpIfTest$9) {
    } else {
      tmpIfTest$9 = tmpClusterSSA_b === 1;
      if (tmpIfTest$9) {
      } else {
        tmpIfTest$9 = tmpClusterSSA_b === 2;
        if (tmpIfTest$9) {
        } else {
          tmpIfTest$9 = tmpClusterSSA_b === 3;
        }
      }
    }
    if (tmpIfTest$9) {
      const tmpPostUpdArgIdent$7 = counter_a;
      counter_a = counter_a + 1;
      const tmpClusterSSA_a$1 = dataarray[tmpPostUpdArgIdent$7];
      if (tmpClusterSSA_a$1) {
        const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_b === 0;
        if (tmpIfTest$1) {
          hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
          const tmpClusterSSA_c /*:number*/ = counter_a + 1;
          const tmpClusterSSA_h = dataarray[counter_a];
          counter_a = tmpClusterSSA_c + 1;
          const tmpClusterSSA_m = dataarray[tmpClusterSSA_c];
          const tmpBinLhs$1 /*:number*/ = tmpClusterSSA_a$1 & 224;
          const tmpCallCallee = $frfr;
          const tmpCalleeParam$3 /*:number*/ = tmpClusterSSA_h << 8;
          const tmpBinLhs$4 = tmpCallCallee(tmpFree, tmpBinLhs$1, tmpCalleeParam$3);
          const tmpBinLhs$2 /*:number*/ = tmpBinLhs$4 | tmpClusterSSA_m;
          a = tmpBinLhs$2 + 2056;
        } else {
          const tmpIfTest$3 /*:boolean*/ = tmpClusterSSA_b === 1;
          if (tmpIfTest$3) {
            hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
            const tmpPostUpdArgIdent$13 = counter_a;
            counter_a = counter_a + 1;
            const tmpClusterSSA_h$1 = dataarray[tmpPostUpdArgIdent$13];
            const tmpBinLhs$10 /*:number*/ = tmpClusterSSA_a$1 & 224;
            const tmpBinLhs$8 /*:number*/ = tmpBinLhs$10 << 3;
            const tmpBinLhs$6 /*:number*/ = tmpBinLhs$8 | tmpClusterSSA_h$1;
            a = tmpBinLhs$6 + 8;
          } else {
            const tmpIfTest$5 /*:boolean*/ = tmpClusterSSA_b === 2;
            if (tmpIfTest$5) {
              const tmpBinLhs$12 /*:number*/ = tmpClusterSSA_a$1 >> 6;
              hoezithetmetdezeb = tmpBinLhs$12 + 1;
              const tmpBinLhs$14 /*:number*/ = tmpClusterSSA_a$1 & 63;
              a = tmpBinLhs$14 + 8;
            } else {
              hoezithetmetdezeb = tmpClusterSSA_a$1 & 31;
              const tmpBinLhs$16 /*:number*/ = tmpClusterSSA_a$1 >> 5;
              a = tmpBinLhs$16 + 1;
            }
          }
        }
        const tmpIfTest$7 /*:boolean*/ = hoezithetmetdezeb < 28;
        let tmpIfTest$10 /*:primitive*/ = undefined;
        if (tmpIfTest$7) {
          hoezithetmetdezeb = hoezithetmetdezeb + 2;
          tmpIfTest$10 = 0 < hoezithetmetdezeb;
        } else {
          const tmpAssignRhsCompProp$9 /*:number*/ = hoezithetmetdezeb - 28;
          hoezithetmetdezeb = nudan[tmpAssignRhsCompProp$9];
          tmpIfTest$10 = 0 < hoezithetmetdezeb;
        }
        if (tmpIfTest$10) {
          const tmpCompProp /*:number*/ = counter_b - a;
          const tmpAssignComputedRhs = output_array[tmpCompProp];
          output_array[counter_b] = tmpAssignComputedRhs;
          counter_b = counter_b + 1;
          const tmpIfTest$12 /*:boolean*/ = 1 < hoezithetmetdezeb;
          if (tmpIfTest$12) {
            const tmpCompProp$1 /*:number*/ = counter_b - a;
            const tmpAssignComputedRhs$1 = output_array[tmpCompProp$1];
            output_array[counter_b] = tmpAssignComputedRhs$1;
            counter_b = counter_b + 1;
            let tmpClusterSSA_i$1 /*:number*/ = 2;
            while ($LOOP_UNROLL_10) {
              const tmpIfTest$2 /*:boolean*/ = tmpClusterSSA_i$1 < hoezithetmetdezeb;
              if (tmpIfTest$2) {
                const tmpCompProp$2 /*:number*/ = counter_b - a;
                const tmpAssignComputedRhs$2 = output_array[tmpCompProp$2];
                output_array[counter_b] = tmpAssignComputedRhs$2;
                counter_b = counter_b + 1;
                tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
              } else {
                break;
              }
            }
          } else {
          }
        } else {
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
const tmpCalleeParam$5 = output_array.join(``);
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = d;
  const e = f;
  debugger;
  const g = c << 11;
  const h = g | e;
  return h;
};
let i = undefined;
let j = undefined;
let k = 4;
let l = 0;
const m = [ 0, 1, 2, 3, 47, 47, 192, 13, 10, 40, 31337, 221, 218, 39, 1, 5, 2, 13 ];
const n = [ 35, 48, 72, 128 ];
const o = [];
while (true) {
  const p = k < 92;
  if (p) {
    const q = k;
    k = k + 1;
    const r = m[ q ];
    let s = r === 0;
    if (s) {

    }
    else {
      s = r === 1;
      if (s) {

      }
      else {
        s = r === 2;
        if (s) {

        }
        else {
          s = r === 3;
        }
      }
    }
    if (s) {
      const t = k;
      k = k + 1;
      const u = m[ t ];
      if (u) {
        const v = r === 0;
        if (v) {
          j = u & 31;
          const w = k + 1;
          const x = m[ k ];
          k = w + 1;
          const y = m[ w ];
          const z = u & 224;
          const ba = bb;
          const bc = x << 8;
          const bd = ba( a, z, bc );
          const be = bd | y;
          i = be + 2056;
        }
        else {
          const bf = r === 1;
          if (bf) {
            j = u & 31;
            const bg = k;
            k = k + 1;
            const bh = m[ bg ];
            const bi = u & 224;
            const bj = bi << 3;
            const bk = bj | bh;
            i = bk + 8;
          }
          else {
            const bl = r === 2;
            if (bl) {
              const bm = u >> 6;
              j = bm + 1;
              const bn = u & 63;
              i = bn + 8;
            }
            else {
              j = u & 31;
              const bo = u >> 5;
              i = bo + 1;
            }
          }
        }
        const bp = j < 28;
        let bq = undefined;
        if (bp) {
          j = j + 2;
          bq = 0 < j;
        }
        else {
          const br = j - 28;
          j = n[ br ];
          bq = 0 < j;
        }
        if (bq) {
          const bs = l - i;
          const bt = o[ bs ];
          o[l] = bt;
          l = l + 1;
          const bu = 1 < j;
          if (bu) {
            const bv = l - i;
            const bw = o[ bv ];
            o[l] = bw;
            l = l + 1;
            let bx = 2;
            while ($LOOP_UNROLL_10) {
              const by = bx < j;
              if (by) {
                const bz = l - i;
                const ca = o[ bz ];
                o[l] = ca;
                l = l + 1;
                bx = bx + 1;
              }
              else {
                break;
              }
            }
          }
        }
      }
      else {
        const cb = l;
        l = l + 1;
        o[cb] = r;
      }
    }
    else {
      const cc = l;
      l = l + 1;
      o[cc] = r;
    }
  }
  else {
    break;
  }
}
const cd = o.join( "" );
$( cd );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '4747192131040313372212183947471921310403133713'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
