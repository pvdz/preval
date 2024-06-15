# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$("$")]?.($(1)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$(`\$`)]?.($(1)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
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
      a = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const b = { $: $ };
loopStop: {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject == null;
    if (tmpIfTest$3) {
      $(100);
    } else {
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
      a = tmpChainElementCall$1;
      if (tmpChainElementCall$1) {
        $(100);
      } else {
        break loopStop;
      }
    }
  }
  loopStop$1: {
    const tmpChainElementCall$2 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainRootComputed$1 = $(`\$`);
      const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
      const tmpIfTest$4 = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
        $(100);
      } else {
        const tmpCalleeParam$1 = $(1);
        const tmpChainElementCall$4 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$1);
        a = tmpChainElementCall$4;
        if (tmpChainElementCall$4) {
          $(100);
        } else {
          break loopStop$1;
        }
      }
    }
    loopStop$2: {
      const tmpChainElementCall$3 = $(b);
      const tmpIfTest$5 = tmpChainElementCall$3 == null;
      if (tmpIfTest$5) {
        $(100);
      } else {
        const tmpChainRootComputed$2 = $(`\$`);
        const tmpChainElementObject$2 = tmpChainElementCall$3[tmpChainRootComputed$2];
        const tmpIfTest$7 = tmpChainElementObject$2 == null;
        if (tmpIfTest$7) {
          $(100);
        } else {
          const tmpCalleeParam$2 = $(1);
          const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$2, tmpChainElementCall$3, tmpCalleeParam$2);
          a = tmpChainElementCall$5;
          if (tmpChainElementCall$5) {
            $(100);
          } else {
            break loopStop$2;
          }
        }
      }
      loopStop$3: {
        const tmpChainElementCall$6 = $(b);
        const tmpIfTest$6 = tmpChainElementCall$6 == null;
        if (tmpIfTest$6) {
          $(100);
        } else {
          const tmpChainRootComputed$3 = $(`\$`);
          const tmpChainElementObject$3 = tmpChainElementCall$6[tmpChainRootComputed$3];
          const tmpIfTest$8 = tmpChainElementObject$3 == null;
          if (tmpIfTest$8) {
            $(100);
          } else {
            const tmpCalleeParam$4 = $(1);
            const tmpChainElementCall$8 = $dotCall(tmpChainElementObject$3, tmpChainElementCall$6, tmpCalleeParam$4);
            a = tmpChainElementCall$8;
            if (tmpChainElementCall$8) {
              $(100);
            } else {
              break loopStop$3;
            }
          }
        }
        loopStop$4: {
          const tmpChainElementCall$7 = $(b);
          const tmpIfTest$9 = tmpChainElementCall$7 == null;
          if (tmpIfTest$9) {
            $(100);
          } else {
            const tmpChainRootComputed$4 = $(`\$`);
            const tmpChainElementObject$4 = tmpChainElementCall$7[tmpChainRootComputed$4];
            const tmpIfTest$11 = tmpChainElementObject$4 == null;
            if (tmpIfTest$11) {
              $(100);
            } else {
              const tmpCalleeParam$5 = $(1);
              const tmpChainElementCall$9 = $dotCall(tmpChainElementObject$4, tmpChainElementCall$7, tmpCalleeParam$5);
              a = tmpChainElementCall$9;
              if (tmpChainElementCall$9) {
                $(100);
              } else {
                break loopStop$4;
              }
            }
          }
          loopStop$5: {
            const tmpChainElementCall$10 = $(b);
            const tmpIfTest$10 = tmpChainElementCall$10 == null;
            if (tmpIfTest$10) {
              $(100);
            } else {
              const tmpChainRootComputed$5 = $(`\$`);
              const tmpChainElementObject$5 = tmpChainElementCall$10[tmpChainRootComputed$5];
              const tmpIfTest$12 = tmpChainElementObject$5 == null;
              if (tmpIfTest$12) {
                $(100);
              } else {
                const tmpCalleeParam$6 = $(1);
                const tmpChainElementCall$12 = $dotCall(tmpChainElementObject$5, tmpChainElementCall$10, tmpCalleeParam$6);
                a = tmpChainElementCall$12;
                if (tmpChainElementCall$12) {
                  $(100);
                } else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6: {
              const tmpChainElementCall$11 = $(b);
              const tmpIfTest$13 = tmpChainElementCall$11 == null;
              if (tmpIfTest$13) {
                $(100);
              } else {
                const tmpChainRootComputed$6 = $(`\$`);
                const tmpChainElementObject$6 = tmpChainElementCall$11[tmpChainRootComputed$6];
                const tmpIfTest$15 = tmpChainElementObject$6 == null;
                if (tmpIfTest$15) {
                  $(100);
                } else {
                  const tmpCalleeParam$7 = $(1);
                  const tmpChainElementCall$13 = $dotCall(tmpChainElementObject$6, tmpChainElementCall$11, tmpCalleeParam$7);
                  a = tmpChainElementCall$13;
                  if (tmpChainElementCall$13) {
                    $(100);
                  } else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7: {
                const tmpChainElementCall$14 = $(b);
                const tmpIfTest$14 = tmpChainElementCall$14 == null;
                if (tmpIfTest$14) {
                  $(100);
                } else {
                  const tmpChainRootComputed$7 = $(`\$`);
                  const tmpChainElementObject$7 = tmpChainElementCall$14[tmpChainRootComputed$7];
                  const tmpIfTest$16 = tmpChainElementObject$7 == null;
                  if (tmpIfTest$16) {
                    $(100);
                  } else {
                    const tmpCalleeParam$8 = $(1);
                    const tmpChainElementCall$16 = $dotCall(tmpChainElementObject$7, tmpChainElementCall$14, tmpCalleeParam$8);
                    a = tmpChainElementCall$16;
                    if (tmpChainElementCall$16) {
                      $(100);
                    } else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$15 = $(b);
                  const tmpIfTest$17 = tmpChainElementCall$15 == null;
                  if (tmpIfTest$17) {
                    $(100);
                  } else {
                    const tmpChainRootComputed$8 = $(`\$`);
                    const tmpChainElementObject$8 = tmpChainElementCall$15[tmpChainRootComputed$8];
                    const tmpIfTest$19 = tmpChainElementObject$8 == null;
                    if (tmpIfTest$19) {
                      $(100);
                    } else {
                      const tmpCalleeParam$9 = $(1);
                      const tmpChainElementCall$17 = $dotCall(tmpChainElementObject$8, tmpChainElementCall$15, tmpCalleeParam$9);
                      a = tmpChainElementCall$17;
                      if (tmpChainElementCall$17) {
                        $(100);
                      } else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$18 = $(b);
                    const tmpIfTest$18 = tmpChainElementCall$18 == null;
                    if (tmpIfTest$18) {
                      $(100);
                    } else {
                      const tmpChainRootComputed$9 = $(`\$`);
                      const tmpChainElementObject$9 = tmpChainElementCall$18[tmpChainRootComputed$9];
                      const tmpIfTest$20 = tmpChainElementObject$9 == null;
                      if (tmpIfTest$20) {
                        $(100);
                      } else {
                        const tmpCalleeParam$10 = $(1);
                        const tmpChainElementCall$20 = $dotCall(tmpChainElementObject$9, tmpChainElementCall$18, tmpCalleeParam$10);
                        a = tmpChainElementCall$20;
                        if (tmpChainElementCall$20) {
                          $(100);
                        } else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$19 = $(b);
                      const tmpIfTest$21 = tmpChainElementCall$19 == null;
                      if (tmpIfTest$21) {
                        $(100);
                      } else {
                        const tmpChainRootComputed$10 = $(`\$`);
                        const tmpChainElementObject$10 = tmpChainElementCall$19[tmpChainRootComputed$10];
                        const tmpIfTest$23 = tmpChainElementObject$10 == null;
                        if (tmpIfTest$23) {
                          $(100);
                        } else {
                          const tmpCalleeParam$11 = $(1);
                          const tmpChainElementCall$21 = $dotCall(tmpChainElementObject$10, tmpChainElementCall$19, tmpCalleeParam$11);
                          a = tmpChainElementCall$21;
                          if (tmpChainElementCall$21) {
                            $(100);
                          } else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$22 = $(b);
                        const tmpIfTest$22 = tmpChainElementCall$22 == null;
                        if (tmpIfTest$22) {
                          $(100);
                        } else {
                          const tmpChainRootComputed$11 = $(`\$`);
                          const tmpChainElementObject$11 = tmpChainElementCall$22[tmpChainRootComputed$11];
                          const tmpIfTest$24 = tmpChainElementObject$11 == null;
                          if (tmpIfTest$24) {
                            $(100);
                          } else {
                            const tmpCalleeParam$12 = $(1);
                            const tmpChainElementCall$24 = $dotCall(tmpChainElementObject$11, tmpChainElementCall$22, tmpCalleeParam$12);
                            a = tmpChainElementCall$24;
                            if (tmpChainElementCall$24) {
                              $(100);
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
let a = undefined;
const b = { $: $ };
loopStop: {
  const c = $( b );
  const d = c == null;
  if (d) {
    $( 100 );
  }
  else {
    const e = $( "$" );
    const f = c[ e ];
    const g = f == null;
    if (g) {
      $( 100 );
    }
    else {
      const h = $( 1 );
      const i = $dotCall( f, c, h );
      a = i;
      if (i) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
  }
  loopStop$1:   {
    const j = $( b );
    const k = j == null;
    if (k) {
      $( 100 );
    }
    else {
      const l = $( "$" );
      const m = j[ l ];
      const n = m == null;
      if (n) {
        $( 100 );
      }
      else {
        const o = $( 1 );
        const p = $dotCall( m, j, o );
        a = p;
        if (p) {
          $( 100 );
        }
        else {
          break loopStop$1;
        }
      }
    }
    loopStop$2:     {
      const q = $( b );
      const r = q == null;
      if (r) {
        $( 100 );
      }
      else {
        const s = $( "$" );
        const t = q[ s ];
        const u = t == null;
        if (u) {
          $( 100 );
        }
        else {
          const v = $( 1 );
          const w = $dotCall( t, q, v );
          a = w;
          if (w) {
            $( 100 );
          }
          else {
            break loopStop$2;
          }
        }
      }
      loopStop$3:       {
        const x = $( b );
        const y = x == null;
        if (y) {
          $( 100 );
        }
        else {
          const z = $( "$" );
          const 01 = x[ z ];
          const 11 = 01 == null;
          if (11) {
            $( 100 );
          }
          else {
            const 21 = $( 1 );
            const 31 = $dotCall( 01, x, 21 );
            a = 31;
            if (31) {
              $( 100 );
            }
            else {
              break loopStop$3;
            }
          }
        }
        loopStop$4:         {
          const 41 = $( b );
          const 51 = 41 == null;
          if (51) {
            $( 100 );
          }
          else {
            const 61 = $( "$" );
            const 71 = 41[ 61 ];
            const 81 = 71 == null;
            if (81) {
              $( 100 );
            }
            else {
              const 91 = $( 1 );
              const a1 = $dotCall( 71, 41, 91 );
              a = a1;
              if (a1) {
                $( 100 );
              }
              else {
                break loopStop$4;
              }
            }
          }
          loopStop$5:           {
            const b1 = $( b );
            const c1 = b1 == null;
            if (c1) {
              $( 100 );
            }
            else {
              const d1 = $( "$" );
              const e1 = b1[ d1 ];
              const f1 = e1 == null;
              if (f1) {
                $( 100 );
              }
              else {
                const g1 = $( 1 );
                const h1 = $dotCall( e1, b1, g1 );
                a = h1;
                if (h1) {
                  $( 100 );
                }
                else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6:             {
              const i1 = $( b );
              const j1 = i1 == null;
              if (j1) {
                $( 100 );
              }
              else {
                const k1 = $( "$" );
                const l1 = i1[ k1 ];
                const m1 = l1 == null;
                if (m1) {
                  $( 100 );
                }
                else {
                  const n1 = $( 1 );
                  const o1 = $dotCall( l1, i1, n1 );
                  a = o1;
                  if (o1) {
                    $( 100 );
                  }
                  else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7:               {
                const p1 = $( b );
                const q1 = p1 == null;
                if (q1) {
                  $( 100 );
                }
                else {
                  const r1 = $( "$" );
                  const s1 = p1[ r1 ];
                  const t1 = s1 == null;
                  if (t1) {
                    $( 100 );
                  }
                  else {
                    const u1 = $( 1 );
                    const v1 = $dotCall( s1, p1, u1 );
                    a = v1;
                    if (v1) {
                      $( 100 );
                    }
                    else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8:                 {
                  const w1 = $( b );
                  const x1 = w1 == null;
                  if (x1) {
                    $( 100 );
                  }
                  else {
                    const y1 = $( "$" );
                    const z1 = w1[ y1 ];
                    const 02 = z1 == null;
                    if (02) {
                      $( 100 );
                    }
                    else {
                      const 12 = $( 1 );
                      const 22 = $dotCall( z1, w1, 12 );
                      a = 22;
                      if (22) {
                        $( 100 );
                      }
                      else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9:                   {
                    const 32 = $( b );
                    const 42 = 32 == null;
                    if (42) {
                      $( 100 );
                    }
                    else {
                      const 52 = $( "$" );
                      const 62 = 32[ 52 ];
                      const 72 = 62 == null;
                      if (72) {
                        $( 100 );
                      }
                      else {
                        const 82 = $( 1 );
                        const 92 = $dotCall( 62, 32, 82 );
                        a = 92;
                        if (92) {
                          $( 100 );
                        }
                        else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10:                     {
                      const a2 = $( b );
                      const b2 = a2 == null;
                      if (b2) {
                        $( 100 );
                      }
                      else {
                        const c2 = $( "$" );
                        const d2 = a2[ c2 ];
                        const e2 = d2 == null;
                        if (e2) {
                          $( 100 );
                        }
                        else {
                          const f2 = $( 1 );
                          const g2 = $dotCall( d2, a2, f2 );
                          a = g2;
                          if (g2) {
                            $( 100 );
                          }
                          else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const h2 = $( b );
                        const i2 = h2 == null;
                        if (i2) {
                          $( 100 );
                        }
                        else {
                          const j2 = $( "$" );
                          const k2 = h2[ j2 ];
                          const l2 = k2 == null;
                          if (l2) {
                            $( 100 );
                          }
                          else {
                            const m2 = $( 1 );
                            const n2 = $dotCall( k2, h2, m2 );
                            a = n2;
                            if (n2) {
                              $( 100 );
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
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: { $: '"<$>"' }
 - 12: '$'
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: { $: '"<$>"' }
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
