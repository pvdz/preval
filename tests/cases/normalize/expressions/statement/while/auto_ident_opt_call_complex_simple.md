# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > While > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.(1)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($)?.(1)) $(100);
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
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
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
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
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
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, 1);
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
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, 1);
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
          const tmpChainElementCall$8 = $dotCall(tmpChainElementCall$6, $, 1);
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
            const tmpChainElementCall$9 = $dotCall(tmpChainElementCall$7, $, 1);
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
              const tmpChainElementCall$12 = $dotCall(tmpChainElementCall$10, $, 1);
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
                const tmpChainElementCall$13 = $dotCall(tmpChainElementCall$11, $, 1);
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
                  const tmpChainElementCall$16 = $dotCall(tmpChainElementCall$14, $, 1);
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
                    const tmpChainElementCall$17 = $dotCall(tmpChainElementCall$15, $, 1);
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
                      const tmpChainElementCall$20 = $dotCall(tmpChainElementCall$18, $, 1);
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
                        const tmpChainElementCall$21 = $dotCall(tmpChainElementCall$19, $, 1);
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
                          const tmpChainElementCall$24 = $dotCall(tmpChainElementCall$22, $, 1);
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
    const c = $dotCall( a, $, 1 );
    if (c) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const d = $( $ );
    const e = d == null;
    if (e) {
      $( 100 );
    }
    else {
      const f = $dotCall( d, $, 1 );
      if (f) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const g = $( $ );
      const h = g == null;
      if (h) {
        $( 100 );
      }
      else {
        const i = $dotCall( g, $, 1 );
        if (i) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const j = $( $ );
        const k = j == null;
        if (k) {
          $( 100 );
        }
        else {
          const l = $dotCall( j, $, 1 );
          if (l) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const m = $( $ );
          const n = m == null;
          if (n) {
            $( 100 );
          }
          else {
            const o = $dotCall( m, $, 1 );
            if (o) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const p = $( $ );
            const q = p == null;
            if (q) {
              $( 100 );
            }
            else {
              const r = $dotCall( p, $, 1 );
              if (r) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const s = $( $ );
              const t = s == null;
              if (t) {
                $( 100 );
              }
              else {
                const u = $dotCall( s, $, 1 );
                if (u) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const v = $( $ );
                const w = v == null;
                if (w) {
                  $( 100 );
                }
                else {
                  const x = $dotCall( v, $, 1 );
                  if (x) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const y = $( $ );
                  const z = y == null;
                  if (z) {
                    $( 100 );
                  }
                  else {
                    const 01 = $dotCall( y, $, 1 );
                    if (01) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 11 = $( $ );
                    const 21 = 11 == null;
                    if (21) {
                      $( 100 );
                    }
                    else {
                      const 31 = $dotCall( 11, $, 1 );
                      if (31) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 41 = $( $ );
                      const 51 = 41 == null;
                      if (51) {
                        $( 100 );
                      }
                      else {
                        const 61 = $dotCall( 41, $, 1 );
                        if (61) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 71 = $( $ );
                        const 81 = 71 == null;
                        if (81) {
                          $( 100 );
                        }
                        else {
                          const 91 = $dotCall( 71, $, 1 );
                          if (91) {
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
const a1 = {
  a: 999,
  b: 1000,
};
$( a1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: '<$>'
 - 5: 1
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 100
 - 13: '<$>'
 - 14: 1
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 100
 - 19: '<$>'
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 100
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
