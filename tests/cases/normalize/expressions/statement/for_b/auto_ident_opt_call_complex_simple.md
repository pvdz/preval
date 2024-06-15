# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > For b > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $($)?.(1); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($($)?.(1)) {
    $(1);
  }
}
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
    $(1);
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
    $(1);
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
    if (tmpChainElementCall$1) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpChainElementCall$2 = $($);
    const tmpIfTest$2 = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, 1);
      if (tmpChainElementCall$4) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpChainElementCall$3 = $($);
      const tmpIfTest$3 = tmpChainElementCall$3 == null;
      if (tmpIfTest$3) {
        $(1);
      } else {
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, 1);
        if (tmpChainElementCall$5) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpChainElementCall$6 = $($);
        const tmpIfTest$4 = tmpChainElementCall$6 == null;
        if (tmpIfTest$4) {
          $(1);
        } else {
          const tmpChainElementCall$8 = $dotCall(tmpChainElementCall$6, $, 1);
          if (tmpChainElementCall$8) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpChainElementCall$7 = $($);
          const tmpIfTest$5 = tmpChainElementCall$7 == null;
          if (tmpIfTest$5) {
            $(1);
          } else {
            const tmpChainElementCall$9 = $dotCall(tmpChainElementCall$7, $, 1);
            if (tmpChainElementCall$9) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpChainElementCall$10 = $($);
            const tmpIfTest$6 = tmpChainElementCall$10 == null;
            if (tmpIfTest$6) {
              $(1);
            } else {
              const tmpChainElementCall$12 = $dotCall(tmpChainElementCall$10, $, 1);
              if (tmpChainElementCall$12) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpChainElementCall$11 = $($);
              const tmpIfTest$7 = tmpChainElementCall$11 == null;
              if (tmpIfTest$7) {
                $(1);
              } else {
                const tmpChainElementCall$13 = $dotCall(tmpChainElementCall$11, $, 1);
                if (tmpChainElementCall$13) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpChainElementCall$14 = $($);
                const tmpIfTest$8 = tmpChainElementCall$14 == null;
                if (tmpIfTest$8) {
                  $(1);
                } else {
                  const tmpChainElementCall$16 = $dotCall(tmpChainElementCall$14, $, 1);
                  if (tmpChainElementCall$16) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$15 = $($);
                  const tmpIfTest$9 = tmpChainElementCall$15 == null;
                  if (tmpIfTest$9) {
                    $(1);
                  } else {
                    const tmpChainElementCall$17 = $dotCall(tmpChainElementCall$15, $, 1);
                    if (tmpChainElementCall$17) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$18 = $($);
                    const tmpIfTest$10 = tmpChainElementCall$18 == null;
                    if (tmpIfTest$10) {
                      $(1);
                    } else {
                      const tmpChainElementCall$20 = $dotCall(tmpChainElementCall$18, $, 1);
                      if (tmpChainElementCall$20) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$19 = $($);
                      const tmpIfTest$11 = tmpChainElementCall$19 == null;
                      if (tmpIfTest$11) {
                        $(1);
                      } else {
                        const tmpChainElementCall$21 = $dotCall(tmpChainElementCall$19, $, 1);
                        if (tmpChainElementCall$21) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$22 = $($);
                        const tmpIfTest$12 = tmpChainElementCall$22 == null;
                        if (tmpIfTest$12) {
                          $(1);
                        } else {
                          const tmpChainElementCall$24 = $dotCall(tmpChainElementCall$22, $, 1);
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
    $( 1 );
  }
  else {
    const c = $dotCall( a, $, 1 );
    if (c) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const d = $( $ );
    const e = d == null;
    if (e) {
      $( 1 );
    }
    else {
      const f = $dotCall( d, $, 1 );
      if (f) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const g = $( $ );
      const h = g == null;
      if (h) {
        $( 1 );
      }
      else {
        const i = $dotCall( g, $, 1 );
        if (i) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const j = $( $ );
        const k = j == null;
        if (k) {
          $( 1 );
        }
        else {
          const l = $dotCall( j, $, 1 );
          if (l) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const m = $( $ );
          const n = m == null;
          if (n) {
            $( 1 );
          }
          else {
            const o = $dotCall( m, $, 1 );
            if (o) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const p = $( $ );
            const q = p == null;
            if (q) {
              $( 1 );
            }
            else {
              const r = $dotCall( p, $, 1 );
              if (r) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const s = $( $ );
              const t = s == null;
              if (t) {
                $( 1 );
              }
              else {
                const u = $dotCall( s, $, 1 );
                if (u) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const v = $( $ );
                const w = v == null;
                if (w) {
                  $( 1 );
                }
                else {
                  const x = $dotCall( v, $, 1 );
                  if (x) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const y = $( $ );
                  const z = y == null;
                  if (z) {
                    $( 1 );
                  }
                  else {
                    const 01 = $dotCall( y, $, 1 );
                    if (01) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 11 = $( $ );
                    const 21 = 11 == null;
                    if (21) {
                      $( 1 );
                    }
                    else {
                      const 31 = $dotCall( 11, $, 1 );
                      if (31) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 41 = $( $ );
                      const 51 = 41 == null;
                      if (51) {
                        $( 1 );
                      }
                      else {
                        const 61 = $dotCall( 41, $, 1 );
                        if (61) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 71 = $( $ );
                        const 81 = 71 == null;
                        if (81) {
                          $( 1 );
                        }
                        else {
                          const 91 = $dotCall( 71, $, 1 );
                          if (91) {
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
 - 3: 1
 - 4: '<$>'
 - 5: 1
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: '<$>'
 - 17: 1
 - 18: 1
 - 19: '<$>'
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
