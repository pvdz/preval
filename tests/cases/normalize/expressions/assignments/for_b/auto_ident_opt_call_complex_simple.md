# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($)?.(1)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($)?.(1))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
    a = tmpChainElementCall$1;
  } else {
  }
  let tmpIfTest = a;
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
let a = undefined;
loopStop: {
  const tmpChainElementCall = $($);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
    a = tmpChainElementCall$1;
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
      a = tmpChainElementCall$4;
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
        a = tmpChainElementCall$5;
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
          a = tmpChainElementCall$8;
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
            a = tmpChainElementCall$9;
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
              a = tmpChainElementCall$12;
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
                a = tmpChainElementCall$13;
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
                  a = tmpChainElementCall$16;
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
                    a = tmpChainElementCall$17;
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
                      a = tmpChainElementCall$20;
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
                        a = tmpChainElementCall$21;
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
                          a = tmpChainElementCall$24;
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
loopStop: {
  const b = $( $ );
  const c = b == null;
  if (c) {
    $( 1 );
  }
  else {
    const d = $dotCall( b, $, 1 );
    a = d;
    if (d) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const e = $( $ );
    const f = e == null;
    if (f) {
      $( 1 );
    }
    else {
      const g = $dotCall( e, $, 1 );
      a = g;
      if (g) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const h = $( $ );
      const i = h == null;
      if (i) {
        $( 1 );
      }
      else {
        const j = $dotCall( h, $, 1 );
        a = j;
        if (j) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const k = $( $ );
        const l = k == null;
        if (l) {
          $( 1 );
        }
        else {
          const m = $dotCall( k, $, 1 );
          a = m;
          if (m) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const n = $( $ );
          const o = n == null;
          if (o) {
            $( 1 );
          }
          else {
            const p = $dotCall( n, $, 1 );
            a = p;
            if (p) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const q = $( $ );
            const r = q == null;
            if (r) {
              $( 1 );
            }
            else {
              const s = $dotCall( q, $, 1 );
              a = s;
              if (s) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const t = $( $ );
              const u = t == null;
              if (u) {
                $( 1 );
              }
              else {
                const v = $dotCall( t, $, 1 );
                a = v;
                if (v) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const w = $( $ );
                const x = w == null;
                if (x) {
                  $( 1 );
                }
                else {
                  const y = $dotCall( w, $, 1 );
                  a = y;
                  if (y) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const z = $( $ );
                  const 01 = z == null;
                  if (01) {
                    $( 1 );
                  }
                  else {
                    const 11 = $dotCall( z, $, 1 );
                    a = 11;
                    if (11) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 21 = $( $ );
                    const 31 = 21 == null;
                    if (31) {
                      $( 1 );
                    }
                    else {
                      const 41 = $dotCall( 21, $, 1 );
                      a = 41;
                      if (41) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 51 = $( $ );
                      const 61 = 51 == null;
                      if (61) {
                        $( 1 );
                      }
                      else {
                        const 71 = $dotCall( 51, $, 1 );
                        a = 71;
                        if (71) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 81 = $( $ );
                        const 91 = 81 == null;
                        if (91) {
                          $( 1 );
                        }
                        else {
                          const a1 = $dotCall( 81, $, 1 );
                          a = a1;
                          if (a1) {
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
