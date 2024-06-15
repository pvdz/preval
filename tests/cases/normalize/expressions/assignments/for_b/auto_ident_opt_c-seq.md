# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b))?.x); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = (1, 2, $(b))?.x)) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
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
const b = { x: 1 };
loopStop: {
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp == null;
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
    if (tmpChainElementObject) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpChainRootProp$1 = $(b);
    const tmpIfTest$2 = tmpChainRootProp$1 == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
      a = tmpChainElementObject$1;
      if (tmpChainElementObject$1) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpChainRootProp$2 = $(b);
      const tmpIfTest$3 = tmpChainRootProp$2 == null;
      if (tmpIfTest$3) {
        $(1);
      } else {
        const tmpChainElementObject$2 = tmpChainRootProp$2.x;
        a = tmpChainElementObject$2;
        if (tmpChainElementObject$2) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpChainRootProp$3 = $(b);
        const tmpIfTest$4 = tmpChainRootProp$3 == null;
        if (tmpIfTest$4) {
          $(1);
        } else {
          const tmpChainElementObject$3 = tmpChainRootProp$3.x;
          a = tmpChainElementObject$3;
          if (tmpChainElementObject$3) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpChainRootProp$4 = $(b);
          const tmpIfTest$5 = tmpChainRootProp$4 == null;
          if (tmpIfTest$5) {
            $(1);
          } else {
            const tmpChainElementObject$4 = tmpChainRootProp$4.x;
            a = tmpChainElementObject$4;
            if (tmpChainElementObject$4) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpChainRootProp$5 = $(b);
            const tmpIfTest$6 = tmpChainRootProp$5 == null;
            if (tmpIfTest$6) {
              $(1);
            } else {
              const tmpChainElementObject$5 = tmpChainRootProp$5.x;
              a = tmpChainElementObject$5;
              if (tmpChainElementObject$5) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpChainRootProp$6 = $(b);
              const tmpIfTest$7 = tmpChainRootProp$6 == null;
              if (tmpIfTest$7) {
                $(1);
              } else {
                const tmpChainElementObject$6 = tmpChainRootProp$6.x;
                a = tmpChainElementObject$6;
                if (tmpChainElementObject$6) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpChainRootProp$7 = $(b);
                const tmpIfTest$8 = tmpChainRootProp$7 == null;
                if (tmpIfTest$8) {
                  $(1);
                } else {
                  const tmpChainElementObject$7 = tmpChainRootProp$7.x;
                  a = tmpChainElementObject$7;
                  if (tmpChainElementObject$7) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpChainRootProp$8 = $(b);
                  const tmpIfTest$9 = tmpChainRootProp$8 == null;
                  if (tmpIfTest$9) {
                    $(1);
                  } else {
                    const tmpChainElementObject$8 = tmpChainRootProp$8.x;
                    a = tmpChainElementObject$8;
                    if (tmpChainElementObject$8) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpChainRootProp$9 = $(b);
                    const tmpIfTest$10 = tmpChainRootProp$9 == null;
                    if (tmpIfTest$10) {
                      $(1);
                    } else {
                      const tmpChainElementObject$9 = tmpChainRootProp$9.x;
                      a = tmpChainElementObject$9;
                      if (tmpChainElementObject$9) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpChainRootProp$10 = $(b);
                      const tmpIfTest$11 = tmpChainRootProp$10 == null;
                      if (tmpIfTest$11) {
                        $(1);
                      } else {
                        const tmpChainElementObject$10 = tmpChainRootProp$10.x;
                        a = tmpChainElementObject$10;
                        if (tmpChainElementObject$10) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainRootProp$11 = $(b);
                        const tmpIfTest$12 = tmpChainRootProp$11 == null;
                        if (tmpIfTest$12) {
                          $(1);
                        } else {
                          const tmpChainElementObject$11 = tmpChainRootProp$11.x;
                          a = tmpChainElementObject$11;
                          if (tmpChainElementObject$11) {
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
const b = { x: 1 };
loopStop: {
  const c = $( b );
  const d = c == null;
  if (d) {
    $( 1 );
  }
  else {
    const e = c.x;
    a = e;
    if (e) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const f = $( b );
    const g = f == null;
    if (g) {
      $( 1 );
    }
    else {
      const h = f.x;
      a = h;
      if (h) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const i = $( b );
      const j = i == null;
      if (j) {
        $( 1 );
      }
      else {
        const k = i.x;
        a = k;
        if (k) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const l = $( b );
        const m = l == null;
        if (m) {
          $( 1 );
        }
        else {
          const n = l.x;
          a = n;
          if (n) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const o = $( b );
          const p = o == null;
          if (p) {
            $( 1 );
          }
          else {
            const q = o.x;
            a = q;
            if (q) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const r = $( b );
            const s = r == null;
            if (s) {
              $( 1 );
            }
            else {
              const t = r.x;
              a = t;
              if (t) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const u = $( b );
              const v = u == null;
              if (v) {
                $( 1 );
              }
              else {
                const w = u.x;
                a = w;
                if (w) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const x = $( b );
                const y = x == null;
                if (y) {
                  $( 1 );
                }
                else {
                  const z = x.x;
                  a = z;
                  if (z) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const 01 = $( b );
                  const 11 = 01 == null;
                  if (11) {
                    $( 1 );
                  }
                  else {
                    const 21 = 01.x;
                    a = 21;
                    if (21) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 31 = $( b );
                    const 41 = 31 == null;
                    if (41) {
                      $( 1 );
                    }
                    else {
                      const 51 = 31.x;
                      a = 51;
                      if (51) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 61 = $( b );
                      const 71 = 61 == null;
                      if (71) {
                        $( 1 );
                      }
                      else {
                        const 81 = 61.x;
                        a = 81;
                        if (81) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 91 = $( b );
                        const a1 = 91 == null;
                        if (a1) {
                          $( 1 );
                        }
                        else {
                          const b1 = 91.x;
                          a = b1;
                          if (b1) {
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
 - 2: 1
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '1' }
 - 6: 1
 - 7: { x: '1' }
 - 8: 1
 - 9: { x: '1' }
 - 10: 1
 - 11: { x: '1' }
 - 12: 1
 - 13: { x: '1' }
 - 14: 1
 - 15: { x: '1' }
 - 16: 1
 - 17: { x: '1' }
 - 18: 1
 - 19: { x: '1' }
 - 20: 1
 - 21: { x: '1' }
 - 22: 1
 - 23: { x: '1' }
 - 24: 1
 - 25: { x: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
