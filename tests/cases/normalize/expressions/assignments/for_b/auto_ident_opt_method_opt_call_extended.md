# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > For b > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; (a = b?.c.d.e?.(1)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
{
  while ((a = b?.c.d.e?.(1))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    } else {
    }
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
const tmpObjLitVal$1 = { e: $ };
loopStop: {
  const tmpIfTest$3 = $ == null;
  if (tmpIfTest$3) {
    $(1);
  } else {
    const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
    a = tmpChainElementCall;
    if (tmpChainElementCall) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpChainElementObject$6 = tmpObjLitVal$1.e;
    const tmpIfTest$1 = tmpChainElementObject$6 == null;
    if (tmpIfTest$1) {
      $(1);
    } else {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$6, tmpObjLitVal$1, 1);
      a = tmpChainElementCall$1;
      if (tmpChainElementCall$1) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpChainElementObject$5 = tmpObjLitVal$1.e;
      const tmpIfTest$2 = tmpChainElementObject$5 == null;
      if (tmpIfTest$2) {
        $(1);
      } else {
        const tmpChainElementCall$2 = $dotCall(tmpChainElementObject$5, tmpObjLitVal$1, 1);
        a = tmpChainElementCall$2;
        if (tmpChainElementCall$2) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpChainElementObject$1 = tmpObjLitVal$1.e;
        const tmpIfTest$4 = tmpChainElementObject$1 == null;
        if (tmpIfTest$4) {
          $(1);
        } else {
          const tmpChainElementCall$3 = $dotCall(tmpChainElementObject$1, tmpObjLitVal$1, 1);
          a = tmpChainElementCall$3;
          if (tmpChainElementCall$3) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpChainElementObject$2 = tmpObjLitVal$1.e;
          const tmpIfTest$5 = tmpChainElementObject$2 == null;
          if (tmpIfTest$5) {
            $(1);
          } else {
            const tmpChainElementCall$4 = $dotCall(tmpChainElementObject$2, tmpObjLitVal$1, 1);
            a = tmpChainElementCall$4;
            if (tmpChainElementCall$4) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpChainElementObject$3 = tmpObjLitVal$1.e;
            const tmpIfTest$6 = tmpChainElementObject$3 == null;
            if (tmpIfTest$6) {
              $(1);
            } else {
              const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$3, tmpObjLitVal$1, 1);
              a = tmpChainElementCall$5;
              if (tmpChainElementCall$5) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpChainElementObject$4 = tmpObjLitVal$1.e;
              const tmpIfTest$7 = tmpChainElementObject$4 == null;
              if (tmpIfTest$7) {
                $(1);
              } else {
                const tmpChainElementCall$6 = $dotCall(tmpChainElementObject$4, tmpObjLitVal$1, 1);
                a = tmpChainElementCall$6;
                if (tmpChainElementCall$6) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpChainElementObject$7 = tmpObjLitVal$1.e;
                const tmpIfTest$8 = tmpChainElementObject$7 == null;
                if (tmpIfTest$8) {
                  $(1);
                } else {
                  const tmpChainElementCall$7 = $dotCall(tmpChainElementObject$7, tmpObjLitVal$1, 1);
                  a = tmpChainElementCall$7;
                  if (tmpChainElementCall$7) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpChainElementObject$8 = tmpObjLitVal$1.e;
                  const tmpIfTest$9 = tmpChainElementObject$8 == null;
                  if (tmpIfTest$9) {
                    $(1);
                  } else {
                    const tmpChainElementCall$8 = $dotCall(tmpChainElementObject$8, tmpObjLitVal$1, 1);
                    a = tmpChainElementCall$8;
                    if (tmpChainElementCall$8) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementObject$9 = tmpObjLitVal$1.e;
                    const tmpIfTest$10 = tmpChainElementObject$9 == null;
                    if (tmpIfTest$10) {
                      $(1);
                    } else {
                      const tmpChainElementCall$9 = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, 1);
                      a = tmpChainElementCall$9;
                      if (tmpChainElementCall$9) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementObject$10 = tmpObjLitVal$1.e;
                      const tmpIfTest$11 = tmpChainElementObject$10 == null;
                      if (tmpIfTest$11) {
                        $(1);
                      } else {
                        const tmpChainElementCall$10 = $dotCall(tmpChainElementObject$10, tmpObjLitVal$1, 1);
                        a = tmpChainElementCall$10;
                        if (tmpChainElementCall$10) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementObject$11 = tmpObjLitVal$1.e;
                        const tmpIfTest$12 = tmpChainElementObject$11 == null;
                        if (tmpIfTest$12) {
                          $(1);
                        } else {
                          const tmpChainElementCall$11 = $dotCall(tmpChainElementObject$11, tmpObjLitVal$1, 1);
                          a = tmpChainElementCall$11;
                          if (tmpChainElementCall$11) {
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
const b = { e: $ };
loopStop: {
  const c = $ == null;
  if (c) {
    $( 1 );
  }
  else {
    const d = $dotCall( $, b, 1 );
    a = d;
    if (d) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const e = b.e;
    const f = e == null;
    if (f) {
      $( 1 );
    }
    else {
      const g = $dotCall( e, b, 1 );
      a = g;
      if (g) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const h = b.e;
      const i = h == null;
      if (i) {
        $( 1 );
      }
      else {
        const j = $dotCall( h, b, 1 );
        a = j;
        if (j) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const k = b.e;
        const l = k == null;
        if (l) {
          $( 1 );
        }
        else {
          const m = $dotCall( k, b, 1 );
          a = m;
          if (m) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const n = b.e;
          const o = n == null;
          if (o) {
            $( 1 );
          }
          else {
            const p = $dotCall( n, b, 1 );
            a = p;
            if (p) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const q = b.e;
            const r = q == null;
            if (r) {
              $( 1 );
            }
            else {
              const s = $dotCall( q, b, 1 );
              a = s;
              if (s) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const t = b.e;
              const u = t == null;
              if (u) {
                $( 1 );
              }
              else {
                const v = $dotCall( t, b, 1 );
                a = v;
                if (v) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const w = b.e;
                const x = w == null;
                if (x) {
                  $( 1 );
                }
                else {
                  const y = $dotCall( w, b, 1 );
                  a = y;
                  if (y) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const z = b.e;
                  const 01 = z == null;
                  if (01) {
                    $( 1 );
                  }
                  else {
                    const 11 = $dotCall( z, b, 1 );
                    a = 11;
                    if (11) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 21 = b.e;
                    const 31 = 21 == null;
                    if (31) {
                      $( 1 );
                    }
                    else {
                      const 41 = $dotCall( 21, b, 1 );
                      a = 41;
                      if (41) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 51 = b.e;
                      const 61 = 51 == null;
                      if (61) {
                        $( 1 );
                      }
                      else {
                        const 71 = $dotCall( 51, b, 1 );
                        a = 71;
                        if (71) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 81 = b.e;
                        const 91 = 81 == null;
                        if (91) {
                          $( 1 );
                        }
                        else {
                          const a1 = $dotCall( 81, b, 1 );
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
