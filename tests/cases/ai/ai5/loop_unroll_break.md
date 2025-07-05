# Preval test case

# loop_unroll_break.md

> Ai > Ai5 > Loop unroll break
>
> Test loop unrolling with complex break/continue patterns

## Input

`````js filename=intro
const x = $(5);
let result = 0;
let i = 0;

while (i < x) {
    if (i === 0) {
        result += 1;
        i++;
        continue;
    }
    if (i === 1) {
        if (x > 3) {
            result += 2;
            i++;
            continue;
        }
        break;
    }
    if (i === 2) {
        result += 3;
        if (x > 4) {
            i++;
            continue;
        }
        break;
    }
    if (i === 3) {
        result += 4;
        if (x > 5) {
            i++;
            continue;
        }
        break;
    }
    if (i === 4) {
        result += 5;
        break;
    }
    i++;
}

$(result);

// Expected:
// const x = $(5);
// let result = 0;
// let i = 0;
// while (i < x) {
//     if (i === 0) {
//         result += 1;
//         i++;
//         continue;
//     }
//     if (i === 1) {
//         if (x > 3) {
//             result += 2;
//             i++;
//             continue;
//         }
//         break;
//     }
//     if (i === 2) {
//         result += 3;
//         if (x > 4) {
//             i++;
//             continue;
//         }
//         break;
//     }
//     if (i === 3) {
//         result += 4;
//         if (x > 5) {
//             i++;
//             continue;
//         }
//         break;
//     }
//     if (i === 4) {
//         result += 5;
//         break;
//     }
//     i++;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(5);
const tmpIfTest /*:boolean*/ = 0 < x;
if (tmpIfTest) {
  let tmpClusterSSA_result /*:number*/ = 1;
  let tmpSSA_i /*:number*/ = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$2 /*:boolean*/ = tmpSSA_i < x;
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:boolean*/ = tmpSSA_i === 0;
      if (tmpIfTest$4) {
        tmpClusterSSA_result = tmpClusterSSA_result + 1;
        tmpSSA_i = tmpSSA_i + 1;
      } else {
        const tmpIfTest$6 /*:boolean*/ = tmpSSA_i === 1;
        if (tmpIfTest$6) {
          const tmpIfTest$8 /*:boolean*/ = x > 3;
          if (tmpIfTest$8) {
            tmpClusterSSA_result = tmpClusterSSA_result + 2;
            tmpSSA_i = tmpSSA_i + 1;
          } else {
            break;
          }
        } else {
          const tmpIfTest$10 /*:boolean*/ = tmpSSA_i === 2;
          if (tmpIfTest$10) {
            tmpClusterSSA_result = tmpClusterSSA_result + 3;
            const tmpIfTest$12 /*:boolean*/ = x > 4;
            if (tmpIfTest$12) {
              tmpSSA_i = tmpSSA_i + 1;
            } else {
              break;
            }
          } else {
            const tmpIfTest$14 /*:boolean*/ = tmpSSA_i === 3;
            if (tmpIfTest$14) {
              tmpClusterSSA_result = tmpClusterSSA_result + 4;
              const tmpIfTest$16 /*:boolean*/ = x > 5;
              if (tmpIfTest$16) {
                tmpSSA_i = tmpSSA_i + 1;
              } else {
                break;
              }
            } else {
              const tmpIfTest$18 /*:boolean*/ = tmpSSA_i === 4;
              if (tmpIfTest$18) {
                tmpClusterSSA_result = tmpClusterSSA_result + 5;
                break;
              } else {
                tmpSSA_i = tmpSSA_i + 1;
              }
            }
          }
        }
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_result);
} else {
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(5);
if (0 < x) {
  let tmpClusterSSA_result = 1;
  let tmpSSA_i = 1;
  while (true) {
    if (tmpSSA_i < x) {
      if (tmpSSA_i === 0) {
        tmpClusterSSA_result = tmpClusterSSA_result + 1;
        tmpSSA_i = tmpSSA_i + 1;
      } else {
        if (tmpSSA_i === 1) {
          if (x > 3) {
            tmpClusterSSA_result = tmpClusterSSA_result + 2;
            tmpSSA_i = tmpSSA_i + 1;
          } else {
            break;
          }
        } else {
          if (tmpSSA_i === 2) {
            tmpClusterSSA_result = tmpClusterSSA_result + 3;
            if (x > 4) {
              tmpSSA_i = tmpSSA_i + 1;
            } else {
              break;
            }
          } else {
            if (tmpSSA_i === 3) {
              tmpClusterSSA_result = tmpClusterSSA_result + 4;
              if (x > 5) {
                tmpSSA_i = tmpSSA_i + 1;
              } else {
                break;
              }
            } else {
              if (tmpSSA_i === 4) {
                tmpClusterSSA_result = tmpClusterSSA_result + 5;
                break;
              } else {
                tmpSSA_i = tmpSSA_i + 1;
              }
            }
          }
        }
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_result);
} else {
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
const b = 0 < a;
if (b) {
  let c = 1;
  let d = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const e = d < a;
    if (e) {
      const f = d === 0;
      if (f) {
        c = c + 1;
        d = d + 1;
      }
      else {
        const g = d === 1;
        if (g) {
          const h = a > 3;
          if (h) {
            c = c + 2;
            d = d + 1;
          }
          else {
            break;
          }
        }
        else {
          const i = d === 2;
          if (i) {
            c = c + 3;
            const j = a > 4;
            if (j) {
              d = d + 1;
            }
            else {
              break;
            }
          }
          else {
            const k = d === 3;
            if (k) {
              c = c + 4;
              const l = a > 5;
              if (l) {
                d = d + 1;
              }
              else {
                break;
              }
            }
            else {
              const m = d === 4;
              if (m) {
                c = c + 5;
                break;
              }
              else {
                d = d + 1;
              }
            }
          }
        }
      }
    }
    else {
      break;
    }
  }
  $( c );
}
else {
  $( 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(5);
let result = 0;
let i = 0;
while (true) {
  const tmpIfTest = i < x;
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = i === 0;
      if (tmpIfTest$1) {
        result = result + 1;
        const tmpPostUpdArgIdent = $coerce(i, `number`);
        i = tmpPostUpdArgIdent + 1;
        break $continue;
      } else {
        const tmpIfTest$3 = i === 1;
        if (tmpIfTest$3) {
          const tmpIfTest$5 = x > 3;
          if (tmpIfTest$5) {
            result = result + 2;
            const tmpPostUpdArgIdent$1 = $coerce(i, `number`);
            i = tmpPostUpdArgIdent$1 + 1;
            break $continue;
          } else {
            break;
          }
        } else {
          const tmpIfTest$7 = i === 2;
          if (tmpIfTest$7) {
            result = result + 3;
            const tmpIfTest$9 = x > 4;
            if (tmpIfTest$9) {
              const tmpPostUpdArgIdent$3 = $coerce(i, `number`);
              i = tmpPostUpdArgIdent$3 + 1;
              break $continue;
            } else {
              break;
            }
          } else {
            const tmpIfTest$11 = i === 3;
            if (tmpIfTest$11) {
              result = result + 4;
              const tmpIfTest$13 = x > 5;
              if (tmpIfTest$13) {
                const tmpPostUpdArgIdent$5 = $coerce(i, `number`);
                i = tmpPostUpdArgIdent$5 + 1;
                break $continue;
              } else {
                break;
              }
            } else {
              const tmpIfTest$15 = i === 4;
              if (tmpIfTest$15) {
                result = result + 5;
                break;
              } else {
                const tmpPostUpdArgIdent$7 = $coerce(i, `number`);
                i = tmpPostUpdArgIdent$7 + 1;
              }
            }
          }
        }
      }
    }
  } else {
    break;
  }
}
$(result);
`````


## Todos triggered


- (todo) transitive reduction with opposite range checks


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
