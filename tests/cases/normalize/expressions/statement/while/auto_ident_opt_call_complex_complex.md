# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.($(1))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.($(1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  } else {
  }
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
loopStop: {
  const tmpChainElementCall = $($);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
    if (tmpChainElementCall$1) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$2 = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, tmpCalleeParam$1);
      if (tmpChainElementCall$4) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpChainElementCall$3 = $($);
      const tmpIfTest$3 = tmpChainElementCall$3 == null;
      if (tmpIfTest$3) {
        $(100);
      } else {
        const tmpCalleeParam$2 = $(1);
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, tmpCalleeParam$2);
        if (tmpChainElementCall$5) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpChainElementCall$6 = $($);
        const tmpIfTest$4 = tmpChainElementCall$6 == null;
        if (tmpIfTest$4) {
          $(100);
        } else {
          const tmpCalleeParam$4 = $(1);
          const tmpChainElementCall$8 = $dotCall(tmpChainElementCall$6, $, tmpCalleeParam$4);
          if (tmpChainElementCall$8) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpChainElementCall$7 = $($);
          const tmpIfTest$5 = tmpChainElementCall$7 == null;
          if (tmpIfTest$5) {
            $(100);
          } else {
            const tmpCalleeParam$5 = $(1);
            const tmpChainElementCall$9 = $dotCall(tmpChainElementCall$7, $, tmpCalleeParam$5);
            if (tmpChainElementCall$9) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpChainElementCall$10 = $($);
            const tmpIfTest$6 = tmpChainElementCall$10 == null;
            if (tmpIfTest$6) {
              $(100);
            } else {
              const tmpCalleeParam$6 = $(1);
              const tmpChainElementCall$12 = $dotCall(tmpChainElementCall$10, $, tmpCalleeParam$6);
              if (tmpChainElementCall$12) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpChainElementCall$11 = $($);
              const tmpIfTest$7 = tmpChainElementCall$11 == null;
              if (tmpIfTest$7) {
                $(100);
              } else {
                const tmpCalleeParam$7 = $(1);
                const tmpChainElementCall$13 = $dotCall(tmpChainElementCall$11, $, tmpCalleeParam$7);
                if (tmpChainElementCall$13) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpChainElementCall$14 = $($);
                const tmpIfTest$8 = tmpChainElementCall$14 == null;
                if (tmpIfTest$8) {
                  $(100);
                } else {
                  const tmpCalleeParam$8 = $(1);
                  const tmpChainElementCall$16 = $dotCall(tmpChainElementCall$14, $, tmpCalleeParam$8);
                  if (tmpChainElementCall$16) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$15 = $($);
                  const tmpIfTest$9 = tmpChainElementCall$15 == null;
                  if (tmpIfTest$9) {
                    $(100);
                  } else {
                    const tmpCalleeParam$9 = $(1);
                    const tmpChainElementCall$17 = $dotCall(tmpChainElementCall$15, $, tmpCalleeParam$9);
                    if (tmpChainElementCall$17) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$18 = $($);
                    const tmpIfTest$10 = tmpChainElementCall$18 == null;
                    if (tmpIfTest$10) {
                      $(100);
                    } else {
                      const tmpCalleeParam$10 = $(1);
                      const tmpChainElementCall$20 = $dotCall(tmpChainElementCall$18, $, tmpCalleeParam$10);
                      if (tmpChainElementCall$20) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$19 = $($);
                      const tmpIfTest$11 = tmpChainElementCall$19 == null;
                      if (tmpIfTest$11) {
                        $(100);
                      } else {
                        const tmpCalleeParam$11 = $(1);
                        const tmpChainElementCall$21 = $dotCall(tmpChainElementCall$19, $, tmpCalleeParam$11);
                        if (tmpChainElementCall$21) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$22 = $($);
                        const tmpIfTest$12 = tmpChainElementCall$22 == null;
                        if (tmpIfTest$12) {
                          $(100);
                        } else {
                          const tmpCalleeParam$12 = $(1);
                          const tmpChainElementCall$24 = $dotCall(tmpChainElementCall$22, $, tmpCalleeParam$12);
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
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop: {
  const a = $( $ );
  const b = a == null;
  if (b) {
    $( 100 );
  }
  else {
    const c = $( 1 );
    const d = $dotCall( a, $, c );
    if (d) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const e = $( $ );
    const f = e == null;
    if (f) {
      $( 100 );
    }
    else {
      const g = $( 1 );
      const h = $dotCall( e, $, g );
      if (h) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const i = $( $ );
      const j = i == null;
      if (j) {
        $( 100 );
      }
      else {
        const k = $( 1 );
        const l = $dotCall( i, $, k );
        if (l) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const m = $( $ );
        const n = m == null;
        if (n) {
          $( 100 );
        }
        else {
          const o = $( 1 );
          const p = $dotCall( m, $, o );
          if (p) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const q = $( $ );
          const r = q == null;
          if (r) {
            $( 100 );
          }
          else {
            const s = $( 1 );
            const t = $dotCall( q, $, s );
            if (t) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const u = $( $ );
            const v = u == null;
            if (v) {
              $( 100 );
            }
            else {
              const w = $( 1 );
              const x = $dotCall( u, $, w );
              if (x) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const y = $( $ );
              const z = y == null;
              if (z) {
                $( 100 );
              }
              else {
                const 01 = $( 1 );
                const 11 = $dotCall( y, $, 01 );
                if (11) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const 21 = $( $ );
                const 31 = 21 == null;
                if (31) {
                  $( 100 );
                }
                else {
                  const 41 = $( 1 );
                  const 51 = $dotCall( 21, $, 41 );
                  if (51) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const 61 = $( $ );
                  const 71 = 61 == null;
                  if (71) {
                    $( 100 );
                  }
                  else {
                    const 81 = $( 1 );
                    const 91 = $dotCall( 61, $, 81 );
                    if (91) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const a1 = $( $ );
                    const b1 = a1 == null;
                    if (b1) {
                      $( 100 );
                    }
                    else {
                      const c1 = $( 1 );
                      const d1 = $dotCall( a1, $, c1 );
                      if (d1) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const e1 = $( $ );
                      const f1 = e1 == null;
                      if (f1) {
                        $( 100 );
                      }
                      else {
                        const g1 = $( 1 );
                        const h1 = $dotCall( e1, $, g1 );
                        if (h1) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const i1 = $( $ );
                        const j1 = i1 == null;
                        if (j1) {
                          $( 100 );
                        }
                        else {
                          const k1 = $( 1 );
                          const l1 = $dotCall( i1, $, k1 );
                          if (l1) {
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
const m1 = {
  a: 999,
  b: 1000,
};
$( m1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: 100
 - 9: '<$>'
 - 10: 1
 - 11: 1
 - 12: 100
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: '<$>'
 - 22: 1
 - 23: 1
 - 24: 100
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
