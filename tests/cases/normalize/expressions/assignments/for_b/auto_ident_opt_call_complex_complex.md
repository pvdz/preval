# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($)?.($(1))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($)?.($(1)))) {
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
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
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
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
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
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, tmpCalleeParam$1);
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
        const tmpCalleeParam$2 = $(1);
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, tmpCalleeParam$2);
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
          const tmpCalleeParam$4 = $(1);
          const tmpChainElementCall$8 = $dotCall(tmpChainElementCall$6, $, tmpCalleeParam$4);
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
            const tmpCalleeParam$5 = $(1);
            const tmpChainElementCall$9 = $dotCall(tmpChainElementCall$7, $, tmpCalleeParam$5);
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
              const tmpCalleeParam$6 = $(1);
              const tmpChainElementCall$12 = $dotCall(tmpChainElementCall$10, $, tmpCalleeParam$6);
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
                const tmpCalleeParam$7 = $(1);
                const tmpChainElementCall$13 = $dotCall(tmpChainElementCall$11, $, tmpCalleeParam$7);
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
                  const tmpCalleeParam$8 = $(1);
                  const tmpChainElementCall$16 = $dotCall(tmpChainElementCall$14, $, tmpCalleeParam$8);
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
                    const tmpCalleeParam$9 = $(1);
                    const tmpChainElementCall$17 = $dotCall(tmpChainElementCall$15, $, tmpCalleeParam$9);
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
                      const tmpCalleeParam$10 = $(1);
                      const tmpChainElementCall$20 = $dotCall(tmpChainElementCall$18, $, tmpCalleeParam$10);
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
                        const tmpCalleeParam$11 = $(1);
                        const tmpChainElementCall$21 = $dotCall(tmpChainElementCall$19, $, tmpCalleeParam$11);
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
                          const tmpCalleeParam$12 = $(1);
                          const tmpChainElementCall$24 = $dotCall(tmpChainElementCall$22, $, tmpCalleeParam$12);
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
    const d = $( 1 );
    const e = $dotCall( b, $, d );
    a = e;
    if (e) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const f = $( $ );
    const g = f == null;
    if (g) {
      $( 1 );
    }
    else {
      const h = $( 1 );
      const i = $dotCall( f, $, h );
      a = i;
      if (i) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const j = $( $ );
      const k = j == null;
      if (k) {
        $( 1 );
      }
      else {
        const l = $( 1 );
        const m = $dotCall( j, $, l );
        a = m;
        if (m) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const n = $( $ );
        const o = n == null;
        if (o) {
          $( 1 );
        }
        else {
          const p = $( 1 );
          const q = $dotCall( n, $, p );
          a = q;
          if (q) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const r = $( $ );
          const s = r == null;
          if (s) {
            $( 1 );
          }
          else {
            const t = $( 1 );
            const u = $dotCall( r, $, t );
            a = u;
            if (u) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const v = $( $ );
            const w = v == null;
            if (w) {
              $( 1 );
            }
            else {
              const x = $( 1 );
              const y = $dotCall( v, $, x );
              a = y;
              if (y) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const z = $( $ );
              const 01 = z == null;
              if (01) {
                $( 1 );
              }
              else {
                const 11 = $( 1 );
                const 21 = $dotCall( z, $, 11 );
                a = 21;
                if (21) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const 31 = $( $ );
                const 41 = 31 == null;
                if (41) {
                  $( 1 );
                }
                else {
                  const 51 = $( 1 );
                  const 61 = $dotCall( 31, $, 51 );
                  a = 61;
                  if (61) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const 71 = $( $ );
                  const 81 = 71 == null;
                  if (81) {
                    $( 1 );
                  }
                  else {
                    const 91 = $( 1 );
                    const a1 = $dotCall( 71, $, 91 );
                    a = a1;
                    if (a1) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const b1 = $( $ );
                    const c1 = b1 == null;
                    if (c1) {
                      $( 1 );
                    }
                    else {
                      const d1 = $( 1 );
                      const e1 = $dotCall( b1, $, d1 );
                      a = e1;
                      if (e1) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const f1 = $( $ );
                      const g1 = f1 == null;
                      if (g1) {
                        $( 1 );
                      }
                      else {
                        const h1 = $( 1 );
                        const i1 = $dotCall( f1, $, h1 );
                        a = i1;
                        if (i1) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const j1 = $( $ );
                        const k1 = j1 == null;
                        if (k1) {
                          $( 1 );
                        }
                        else {
                          const l1 = $( 1 );
                          const m1 = $dotCall( j1, $, l1 );
                          a = m1;
                          if (m1) {
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
 - 4: 1
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: '<$>'
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: '<$>'
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
