# Preval test case

# auto_ident_c-opt_complex_complex3.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex3
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const b = { x: 1 };
loopStop: {
  const g = $(b);
  const same = g == null;
  if (same) {
    $(1);
  } else {
    const x = $(`x`);
    const gx = g[x];
    if (gx) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const g$1 = $(b);
    const same$1 = g$1 == null;
    if (same$1) {
      $(1);
    } else {
      const x$1 = $(`x`);
      const gx$1 = g$1[x$1];
      if (gx$1) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const g$2 = $(b);
      const same$2 = g$2 == null;
      if (same$2) {
        $(1);
      } else {
        const x$2 = $(`x`);
        const gx$2 = g$2[x$2];
        if (gx$2) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const g$3 = $(b);
        const same$3 = g$3 == null;
        if (same$3) {
          $(1);
        } else {
          const x$3 = $(`x`);
          const gx$3 = g$3[x$3];
          if (gx$3) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const g$4 = $(b);
          const same$4 = g$4 == null;
          if (same$4) {
            $(1);
          } else {
            const x$4 = $(`x`);
            const gx$4 = g$4[x$4];
            if (gx$4) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const g$5 = $(b);
            const same$5 = g$5 == null;
            if (same$5) {
              $(1);
            } else {
              const x$5 = $(`x`);
              const gx$5 = g$5[x$5];
              if (gx$5) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const g$6 = $(b);
              const same$6 = g$6 == null;
              if (same$6) {
                $(1);
              } else {
                const x$6 = $(`x`);
                const gx$6 = g$6[x$6];
                if (gx$6) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const g$7 = $(b);
                const same$7 = g$7 == null;
                if (same$7) {
                  $(1);
                } else {
                  const x$7 = $(`x`);
                  const gx$7 = g$7[x$7];
                  if (gx$7) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const g$8 = $(b);
                  const same$8 = g$8 == null;
                  if (same$8) {
                    $(1);
                  } else {
                    const x$8 = $(`x`);
                    const gx$8 = g$8[x$8];
                    if (gx$8) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const g$9 = $(b);
                    const same$9 = g$9 == null;
                    if (same$9) {
                      $(1);
                    } else {
                      const x$9 = $(`x`);
                      const gx$9 = g$9[x$9];
                      if (gx$9) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const g$10 = $(b);
                      const same$10 = g$10 == null;
                      if (same$10) {
                        $(1);
                      } else {
                        const x$10 = $(`x`);
                        const gx$10 = g$10[x$10];
                        if (gx$10) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const g$11 = $(b);
                        const same$11 = g$11 == null;
                        if (same$11) {
                          $(1);
                        } else {
                          const x$11 = $(`x`);
                          const gx$11 = g$11[x$11];
                          if (gx$11) {
                            $(1);
                          } else {
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
loopStop: {
  const c = $( b );
  const d = c == null;
  if (d) {
    $( 1 );
  }
  else {
    const e = $( "x" );
    const f = c[ e ];
    if (f) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const g = $( b );
    const h = g == null;
    if (h) {
      $( 1 );
    }
    else {
      const i = $( "x" );
      const j = g[ i ];
      if (j) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const k = $( b );
      const l = k == null;
      if (l) {
        $( 1 );
      }
      else {
        const m = $( "x" );
        const n = k[ m ];
        if (n) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const o = $( b );
        const p = o == null;
        if (p) {
          $( 1 );
        }
        else {
          const q = $( "x" );
          const r = o[ q ];
          if (r) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const s = $( b );
          const t = s == null;
          if (t) {
            $( 1 );
          }
          else {
            const u = $( "x" );
            const v = s[ u ];
            if (v) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const w = $( b );
            const x = w == null;
            if (x) {
              $( 1 );
            }
            else {
              const y = $( "x" );
              const z = w[ y ];
              if (z) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const 01 = $( b );
              const 11 = 01 == null;
              if (11) {
                $( 1 );
              }
              else {
                const 21 = $( "x" );
                const 31 = 01[ 21 ];
                if (31) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const 41 = $( b );
                const 51 = 41 == null;
                if (51) {
                  $( 1 );
                }
                else {
                  const 61 = $( "x" );
                  const 71 = 41[ 61 ];
                  if (71) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const 81 = $( b );
                  const 91 = 81 == null;
                  if (91) {
                    $( 1 );
                  }
                  else {
                    const a1 = $( "x" );
                    const b1 = 81[ a1 ];
                    if (b1) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const c1 = $( b );
                    const d1 = c1 == null;
                    if (d1) {
                      $( 1 );
                    }
                    else {
                      const e1 = $( "x" );
                      const f1 = c1[ e1 ];
                      if (f1) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const g1 = $( b );
                      const h1 = g1 == null;
                      if (h1) {
                        $( 1 );
                      }
                      else {
                        const i1 = $( "x" );
                        const j1 = g1[ i1 ];
                        if (j1) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const k1 = $( b );
                        const l1 = k1 == null;
                        if (l1) {
                          $( 1 );
                        }
                        else {
                          const m1 = $( "x" );
                          const n1 = k1[ m1 ];
                          if (n1) {
                            $( 1 );
                          }
                          else {
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 1
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 1
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 1
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 1
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 1
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 1
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 1
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
