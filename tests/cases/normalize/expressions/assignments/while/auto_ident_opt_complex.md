# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > While > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.x)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ((a = $(b)?.x)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
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
const b = { x: 1 };
loopStop: {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
    if (tmpChainElementObject) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainElementObject$1 = tmpChainElementCall$1.x;
      a = tmpChainElementObject$1;
      if (tmpChainElementObject$1) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpChainElementCall$2 = $(b);
      const tmpIfTest$3 = tmpChainElementCall$2 == null;
      if (tmpIfTest$3) {
        $(100);
      } else {
        const tmpChainElementObject$2 = tmpChainElementCall$2.x;
        a = tmpChainElementObject$2;
        if (tmpChainElementObject$2) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpChainElementCall$3 = $(b);
        const tmpIfTest$4 = tmpChainElementCall$3 == null;
        if (tmpIfTest$4) {
          $(100);
        } else {
          const tmpChainElementObject$3 = tmpChainElementCall$3.x;
          a = tmpChainElementObject$3;
          if (tmpChainElementObject$3) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpChainElementCall$4 = $(b);
          const tmpIfTest$5 = tmpChainElementCall$4 == null;
          if (tmpIfTest$5) {
            $(100);
          } else {
            const tmpChainElementObject$4 = tmpChainElementCall$4.x;
            a = tmpChainElementObject$4;
            if (tmpChainElementObject$4) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpChainElementCall$5 = $(b);
            const tmpIfTest$6 = tmpChainElementCall$5 == null;
            if (tmpIfTest$6) {
              $(100);
            } else {
              const tmpChainElementObject$5 = tmpChainElementCall$5.x;
              a = tmpChainElementObject$5;
              if (tmpChainElementObject$5) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpChainElementCall$6 = $(b);
              const tmpIfTest$7 = tmpChainElementCall$6 == null;
              if (tmpIfTest$7) {
                $(100);
              } else {
                const tmpChainElementObject$6 = tmpChainElementCall$6.x;
                a = tmpChainElementObject$6;
                if (tmpChainElementObject$6) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpChainElementCall$7 = $(b);
                const tmpIfTest$8 = tmpChainElementCall$7 == null;
                if (tmpIfTest$8) {
                  $(100);
                } else {
                  const tmpChainElementObject$7 = tmpChainElementCall$7.x;
                  a = tmpChainElementObject$7;
                  if (tmpChainElementObject$7) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$8 = $(b);
                  const tmpIfTest$9 = tmpChainElementCall$8 == null;
                  if (tmpIfTest$9) {
                    $(100);
                  } else {
                    const tmpChainElementObject$8 = tmpChainElementCall$8.x;
                    a = tmpChainElementObject$8;
                    if (tmpChainElementObject$8) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$9 = $(b);
                    const tmpIfTest$10 = tmpChainElementCall$9 == null;
                    if (tmpIfTest$10) {
                      $(100);
                    } else {
                      const tmpChainElementObject$9 = tmpChainElementCall$9.x;
                      a = tmpChainElementObject$9;
                      if (tmpChainElementObject$9) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$10 = $(b);
                      const tmpIfTest$11 = tmpChainElementCall$10 == null;
                      if (tmpIfTest$11) {
                        $(100);
                      } else {
                        const tmpChainElementObject$10 = tmpChainElementCall$10.x;
                        a = tmpChainElementObject$10;
                        if (tmpChainElementObject$10) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$11 = $(b);
                        const tmpIfTest$12 = tmpChainElementCall$11 == null;
                        if (tmpIfTest$12) {
                          $(100);
                        } else {
                          const tmpChainElementObject$11 = tmpChainElementCall$11.x;
                          a = tmpChainElementObject$11;
                          if (tmpChainElementObject$11) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
loopStop: {
  const c = $( b );
  const d = c == null;
  if (d) {
    $( 100 );
  }
  else {
    const e = c.x;
    a = e;
    if (e) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const f = $( b );
    const g = f == null;
    if (g) {
      $( 100 );
    }
    else {
      const h = f.x;
      a = h;
      if (h) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const i = $( b );
      const j = i == null;
      if (j) {
        $( 100 );
      }
      else {
        const k = i.x;
        a = k;
        if (k) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const l = $( b );
        const m = l == null;
        if (m) {
          $( 100 );
        }
        else {
          const n = l.x;
          a = n;
          if (n) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const o = $( b );
          const p = o == null;
          if (p) {
            $( 100 );
          }
          else {
            const q = o.x;
            a = q;
            if (q) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const r = $( b );
            const s = r == null;
            if (s) {
              $( 100 );
            }
            else {
              const t = r.x;
              a = t;
              if (t) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const u = $( b );
              const v = u == null;
              if (v) {
                $( 100 );
              }
              else {
                const w = u.x;
                a = w;
                if (w) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const x = $( b );
                const y = x == null;
                if (y) {
                  $( 100 );
                }
                else {
                  const z = x.x;
                  a = z;
                  if (z) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const 01 = $( b );
                  const 11 = 01 == null;
                  if (11) {
                    $( 100 );
                  }
                  else {
                    const 21 = 01.x;
                    a = 21;
                    if (21) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 31 = $( b );
                    const 41 = 31 == null;
                    if (41) {
                      $( 100 );
                    }
                    else {
                      const 51 = 31.x;
                      a = 51;
                      if (51) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 61 = $( b );
                      const 71 = 61 == null;
                      if (71) {
                        $( 100 );
                      }
                      else {
                        const 81 = 61.x;
                        a = 81;
                        if (81) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 91 = $( b );
                        const a1 = 91 == null;
                        if (a1) {
                          $( 100 );
                        }
                        else {
                          const b1 = 91.x;
                          a = b1;
                          if (b1) {
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
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '1' }
 - 6: 100
 - 7: { x: '1' }
 - 8: 100
 - 9: { x: '1' }
 - 10: 100
 - 11: { x: '1' }
 - 12: 100
 - 13: { x: '1' }
 - 14: 100
 - 15: { x: '1' }
 - 16: 100
 - 17: { x: '1' }
 - 18: 100
 - 19: { x: '1' }
 - 20: 100
 - 21: { x: '1' }
 - 22: 100
 - 23: { x: '1' }
 - 24: 100
 - 25: { x: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
