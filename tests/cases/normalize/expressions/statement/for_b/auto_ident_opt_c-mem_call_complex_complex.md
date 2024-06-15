# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > For b > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(b)?.[$("$")]?.($(1)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(b)?.[$(`\$`)]?.($(1))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpCallCallee = $dotCall;
      const tmpCalleeParam = tmpChainElementObject;
      const tmpCalleeParam$1 = tmpChainElementCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
      tmpIfTest = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
loopStop: {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject == null;
    if (tmpIfTest$3) {
      $(1);
    } else {
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
      if (tmpChainElementCall$1) {
        $(1);
      } else {
        break loopStop;
      }
    }
  }
  loopStop$1: {
    const tmpChainElementCall$2 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainRootComputed$1 = $(`\$`);
      const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
      const tmpIfTest$4 = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
        $(1);
      } else {
        const tmpCalleeParam$1 = $(1);
        const tmpChainElementCall$4 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$1);
        if (tmpChainElementCall$4) {
          $(1);
        } else {
          break loopStop$1;
        }
      }
    }
    loopStop$2: {
      const tmpChainElementCall$3 = $(b);
      const tmpIfTest$5 = tmpChainElementCall$3 == null;
      if (tmpIfTest$5) {
        $(1);
      } else {
        const tmpChainRootComputed$2 = $(`\$`);
        const tmpChainElementObject$2 = tmpChainElementCall$3[tmpChainRootComputed$2];
        const tmpIfTest$7 = tmpChainElementObject$2 == null;
        if (tmpIfTest$7) {
          $(1);
        } else {
          const tmpCalleeParam$2 = $(1);
          const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$2, tmpChainElementCall$3, tmpCalleeParam$2);
          if (tmpChainElementCall$5) {
            $(1);
          } else {
            break loopStop$2;
          }
        }
      }
      loopStop$3: {
        const tmpChainElementCall$6 = $(b);
        const tmpIfTest$6 = tmpChainElementCall$6 == null;
        if (tmpIfTest$6) {
          $(1);
        } else {
          const tmpChainRootComputed$3 = $(`\$`);
          const tmpChainElementObject$3 = tmpChainElementCall$6[tmpChainRootComputed$3];
          const tmpIfTest$8 = tmpChainElementObject$3 == null;
          if (tmpIfTest$8) {
            $(1);
          } else {
            const tmpCalleeParam$4 = $(1);
            const tmpChainElementCall$8 = $dotCall(tmpChainElementObject$3, tmpChainElementCall$6, tmpCalleeParam$4);
            if (tmpChainElementCall$8) {
              $(1);
            } else {
              break loopStop$3;
            }
          }
        }
        loopStop$4: {
          const tmpChainElementCall$7 = $(b);
          const tmpIfTest$9 = tmpChainElementCall$7 == null;
          if (tmpIfTest$9) {
            $(1);
          } else {
            const tmpChainRootComputed$4 = $(`\$`);
            const tmpChainElementObject$4 = tmpChainElementCall$7[tmpChainRootComputed$4];
            const tmpIfTest$11 = tmpChainElementObject$4 == null;
            if (tmpIfTest$11) {
              $(1);
            } else {
              const tmpCalleeParam$5 = $(1);
              const tmpChainElementCall$9 = $dotCall(tmpChainElementObject$4, tmpChainElementCall$7, tmpCalleeParam$5);
              if (tmpChainElementCall$9) {
                $(1);
              } else {
                break loopStop$4;
              }
            }
          }
          loopStop$5: {
            const tmpChainElementCall$10 = $(b);
            const tmpIfTest$10 = tmpChainElementCall$10 == null;
            if (tmpIfTest$10) {
              $(1);
            } else {
              const tmpChainRootComputed$5 = $(`\$`);
              const tmpChainElementObject$5 = tmpChainElementCall$10[tmpChainRootComputed$5];
              const tmpIfTest$12 = tmpChainElementObject$5 == null;
              if (tmpIfTest$12) {
                $(1);
              } else {
                const tmpCalleeParam$6 = $(1);
                const tmpChainElementCall$12 = $dotCall(tmpChainElementObject$5, tmpChainElementCall$10, tmpCalleeParam$6);
                if (tmpChainElementCall$12) {
                  $(1);
                } else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6: {
              const tmpChainElementCall$11 = $(b);
              const tmpIfTest$13 = tmpChainElementCall$11 == null;
              if (tmpIfTest$13) {
                $(1);
              } else {
                const tmpChainRootComputed$6 = $(`\$`);
                const tmpChainElementObject$6 = tmpChainElementCall$11[tmpChainRootComputed$6];
                const tmpIfTest$15 = tmpChainElementObject$6 == null;
                if (tmpIfTest$15) {
                  $(1);
                } else {
                  const tmpCalleeParam$7 = $(1);
                  const tmpChainElementCall$13 = $dotCall(tmpChainElementObject$6, tmpChainElementCall$11, tmpCalleeParam$7);
                  if (tmpChainElementCall$13) {
                    $(1);
                  } else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7: {
                const tmpChainElementCall$14 = $(b);
                const tmpIfTest$14 = tmpChainElementCall$14 == null;
                if (tmpIfTest$14) {
                  $(1);
                } else {
                  const tmpChainRootComputed$7 = $(`\$`);
                  const tmpChainElementObject$7 = tmpChainElementCall$14[tmpChainRootComputed$7];
                  const tmpIfTest$16 = tmpChainElementObject$7 == null;
                  if (tmpIfTest$16) {
                    $(1);
                  } else {
                    const tmpCalleeParam$8 = $(1);
                    const tmpChainElementCall$16 = $dotCall(tmpChainElementObject$7, tmpChainElementCall$14, tmpCalleeParam$8);
                    if (tmpChainElementCall$16) {
                      $(1);
                    } else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$15 = $(b);
                  const tmpIfTest$17 = tmpChainElementCall$15 == null;
                  if (tmpIfTest$17) {
                    $(1);
                  } else {
                    const tmpChainRootComputed$8 = $(`\$`);
                    const tmpChainElementObject$8 = tmpChainElementCall$15[tmpChainRootComputed$8];
                    const tmpIfTest$19 = tmpChainElementObject$8 == null;
                    if (tmpIfTest$19) {
                      $(1);
                    } else {
                      const tmpCalleeParam$9 = $(1);
                      const tmpChainElementCall$17 = $dotCall(tmpChainElementObject$8, tmpChainElementCall$15, tmpCalleeParam$9);
                      if (tmpChainElementCall$17) {
                        $(1);
                      } else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$18 = $(b);
                    const tmpIfTest$18 = tmpChainElementCall$18 == null;
                    if (tmpIfTest$18) {
                      $(1);
                    } else {
                      const tmpChainRootComputed$9 = $(`\$`);
                      const tmpChainElementObject$9 = tmpChainElementCall$18[tmpChainRootComputed$9];
                      const tmpIfTest$20 = tmpChainElementObject$9 == null;
                      if (tmpIfTest$20) {
                        $(1);
                      } else {
                        const tmpCalleeParam$10 = $(1);
                        const tmpChainElementCall$20 = $dotCall(tmpChainElementObject$9, tmpChainElementCall$18, tmpCalleeParam$10);
                        if (tmpChainElementCall$20) {
                          $(1);
                        } else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$19 = $(b);
                      const tmpIfTest$21 = tmpChainElementCall$19 == null;
                      if (tmpIfTest$21) {
                        $(1);
                      } else {
                        const tmpChainRootComputed$10 = $(`\$`);
                        const tmpChainElementObject$10 = tmpChainElementCall$19[tmpChainRootComputed$10];
                        const tmpIfTest$23 = tmpChainElementObject$10 == null;
                        if (tmpIfTest$23) {
                          $(1);
                        } else {
                          const tmpCalleeParam$11 = $(1);
                          const tmpChainElementCall$21 = $dotCall(tmpChainElementObject$10, tmpChainElementCall$19, tmpCalleeParam$11);
                          if (tmpChainElementCall$21) {
                            $(1);
                          } else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$22 = $(b);
                        const tmpIfTest$22 = tmpChainElementCall$22 == null;
                        if (tmpIfTest$22) {
                          $(1);
                        } else {
                          const tmpChainRootComputed$11 = $(`\$`);
                          const tmpChainElementObject$11 = tmpChainElementCall$22[tmpChainRootComputed$11];
                          const tmpIfTest$24 = tmpChainElementObject$11 == null;
                          if (tmpIfTest$24) {
                            $(1);
                          } else {
                            const tmpCalleeParam$12 = $(1);
                            const tmpChainElementCall$24 = $dotCall(tmpChainElementObject$11, tmpChainElementCall$22, tmpCalleeParam$12);
                            if (tmpChainElementCall$24) {
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
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
loopStop: {
  const c = $( a );
  const d = c == null;
  if (d) {
    $( 1 );
  }
  else {
    const e = $( "$" );
    const f = c[ e ];
    const g = f == null;
    if (g) {
      $( 1 );
    }
    else {
      const h = $( 1 );
      const i = $dotCall( f, c, h );
      if (i) {
        $( 1 );
      }
      else {
        break loopStop;
      }
    }
  }
  loopStop$1:   {
    const j = $( a );
    const k = j == null;
    if (k) {
      $( 1 );
    }
    else {
      const l = $( "$" );
      const m = j[ l ];
      const n = m == null;
      if (n) {
        $( 1 );
      }
      else {
        const o = $( 1 );
        const p = $dotCall( m, j, o );
        if (p) {
          $( 1 );
        }
        else {
          break loopStop$1;
        }
      }
    }
    loopStop$2:     {
      const q = $( a );
      const r = q == null;
      if (r) {
        $( 1 );
      }
      else {
        const s = $( "$" );
        const t = q[ s ];
        const u = t == null;
        if (u) {
          $( 1 );
        }
        else {
          const v = $( 1 );
          const w = $dotCall( t, q, v );
          if (w) {
            $( 1 );
          }
          else {
            break loopStop$2;
          }
        }
      }
      loopStop$3:       {
        const x = $( a );
        const y = x == null;
        if (y) {
          $( 1 );
        }
        else {
          const z = $( "$" );
          const 01 = x[ z ];
          const 11 = 01 == null;
          if (11) {
            $( 1 );
          }
          else {
            const 21 = $( 1 );
            const 31 = $dotCall( 01, x, 21 );
            if (31) {
              $( 1 );
            }
            else {
              break loopStop$3;
            }
          }
        }
        loopStop$4:         {
          const 41 = $( a );
          const 51 = 41 == null;
          if (51) {
            $( 1 );
          }
          else {
            const 61 = $( "$" );
            const 71 = 41[ 61 ];
            const 81 = 71 == null;
            if (81) {
              $( 1 );
            }
            else {
              const 91 = $( 1 );
              const a1 = $dotCall( 71, 41, 91 );
              if (a1) {
                $( 1 );
              }
              else {
                break loopStop$4;
              }
            }
          }
          loopStop$5:           {
            const b1 = $( a );
            const c1 = b1 == null;
            if (c1) {
              $( 1 );
            }
            else {
              const d1 = $( "$" );
              const e1 = b1[ d1 ];
              const f1 = e1 == null;
              if (f1) {
                $( 1 );
              }
              else {
                const g1 = $( 1 );
                const h1 = $dotCall( e1, b1, g1 );
                if (h1) {
                  $( 1 );
                }
                else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6:             {
              const i1 = $( a );
              const j1 = i1 == null;
              if (j1) {
                $( 1 );
              }
              else {
                const k1 = $( "$" );
                const l1 = i1[ k1 ];
                const m1 = l1 == null;
                if (m1) {
                  $( 1 );
                }
                else {
                  const n1 = $( 1 );
                  const o1 = $dotCall( l1, i1, n1 );
                  if (o1) {
                    $( 1 );
                  }
                  else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7:               {
                const p1 = $( a );
                const q1 = p1 == null;
                if (q1) {
                  $( 1 );
                }
                else {
                  const r1 = $( "$" );
                  const s1 = p1[ r1 ];
                  const t1 = s1 == null;
                  if (t1) {
                    $( 1 );
                  }
                  else {
                    const u1 = $( 1 );
                    const v1 = $dotCall( s1, p1, u1 );
                    if (v1) {
                      $( 1 );
                    }
                    else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8:                 {
                  const w1 = $( a );
                  const x1 = w1 == null;
                  if (x1) {
                    $( 1 );
                  }
                  else {
                    const y1 = $( "$" );
                    const z1 = w1[ y1 ];
                    const 02 = z1 == null;
                    if (02) {
                      $( 1 );
                    }
                    else {
                      const 12 = $( 1 );
                      const 22 = $dotCall( z1, w1, 12 );
                      if (22) {
                        $( 1 );
                      }
                      else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9:                   {
                    const 32 = $( a );
                    const 42 = 32 == null;
                    if (42) {
                      $( 1 );
                    }
                    else {
                      const 52 = $( "$" );
                      const 62 = 32[ 52 ];
                      const 72 = 62 == null;
                      if (72) {
                        $( 1 );
                      }
                      else {
                        const 82 = $( 1 );
                        const 92 = $dotCall( 62, 32, 82 );
                        if (92) {
                          $( 1 );
                        }
                        else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10:                     {
                      const a2 = $( a );
                      const b2 = a2 == null;
                      if (b2) {
                        $( 1 );
                      }
                      else {
                        const c2 = $( "$" );
                        const d2 = a2[ c2 ];
                        const e2 = d2 == null;
                        if (e2) {
                          $( 1 );
                        }
                        else {
                          const f2 = $( 1 );
                          const g2 = $dotCall( d2, a2, f2 );
                          if (g2) {
                            $( 1 );
                          }
                          else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const h2 = $( a );
                        const i2 = h2 == null;
                        if (i2) {
                          $( 1 );
                        }
                        else {
                          const j2 = $( "$" );
                          const k2 = h2[ j2 ];
                          const l2 = k2 == null;
                          if (l2) {
                            $( 1 );
                          }
                          else {
                            const m2 = $( 1 );
                            const n2 = $dotCall( k2, h2, m2 );
                            if (n2) {
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
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: '$'
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
