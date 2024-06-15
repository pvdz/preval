# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > While > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $?.(1))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $?.(1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
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
loopStop: {
  const tmpIfTest$1 = $ == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainElementCall = $(1);
    a = tmpChainElementCall;
    if (tmpChainElementCall) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpIfTest$2 = $ == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainElementCall$1 = $(1);
      a = tmpChainElementCall$1;
      if (tmpChainElementCall$1) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpIfTest$3 = $ == null;
      if (tmpIfTest$3) {
        $(100);
      } else {
        const tmpChainElementCall$2 = $(1);
        a = tmpChainElementCall$2;
        if (tmpChainElementCall$2) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpIfTest$4 = $ == null;
        if (tmpIfTest$4) {
          $(100);
        } else {
          const tmpChainElementCall$3 = $(1);
          a = tmpChainElementCall$3;
          if (tmpChainElementCall$3) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpIfTest$5 = $ == null;
          if (tmpIfTest$5) {
            $(100);
          } else {
            const tmpChainElementCall$4 = $(1);
            a = tmpChainElementCall$4;
            if (tmpChainElementCall$4) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpIfTest$6 = $ == null;
            if (tmpIfTest$6) {
              $(100);
            } else {
              const tmpChainElementCall$5 = $(1);
              a = tmpChainElementCall$5;
              if (tmpChainElementCall$5) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpIfTest$7 = $ == null;
              if (tmpIfTest$7) {
                $(100);
              } else {
                const tmpChainElementCall$6 = $(1);
                a = tmpChainElementCall$6;
                if (tmpChainElementCall$6) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpIfTest$8 = $ == null;
                if (tmpIfTest$8) {
                  $(100);
                } else {
                  const tmpChainElementCall$7 = $(1);
                  a = tmpChainElementCall$7;
                  if (tmpChainElementCall$7) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpIfTest$9 = $ == null;
                  if (tmpIfTest$9) {
                    $(100);
                  } else {
                    const tmpChainElementCall$8 = $(1);
                    a = tmpChainElementCall$8;
                    if (tmpChainElementCall$8) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpIfTest$10 = $ == null;
                    if (tmpIfTest$10) {
                      $(100);
                    } else {
                      const tmpChainElementCall$9 = $(1);
                      a = tmpChainElementCall$9;
                      if (tmpChainElementCall$9) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpIfTest$11 = $ == null;
                      if (tmpIfTest$11) {
                        $(100);
                      } else {
                        const tmpChainElementCall$10 = $(1);
                        a = tmpChainElementCall$10;
                        if (tmpChainElementCall$10) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpIfTest$12 = $ == null;
                        if (tmpIfTest$12) {
                          $(100);
                        } else {
                          const tmpChainElementCall$11 = $(1);
                          a = tmpChainElementCall$11;
                          if (tmpChainElementCall$11) {
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
loopStop: {
  const b = $ == null;
  if (b) {
    $( 100 );
  }
  else {
    const c = $( 1 );
    a = c;
    if (c) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const d = $ == null;
    if (d) {
      $( 100 );
    }
    else {
      const e = $( 1 );
      a = e;
      if (e) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const f = $ == null;
      if (f) {
        $( 100 );
      }
      else {
        const g = $( 1 );
        a = g;
        if (g) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const h = $ == null;
        if (h) {
          $( 100 );
        }
        else {
          const i = $( 1 );
          a = i;
          if (i) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const j = $ == null;
          if (j) {
            $( 100 );
          }
          else {
            const k = $( 1 );
            a = k;
            if (k) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const l = $ == null;
            if (l) {
              $( 100 );
            }
            else {
              const m = $( 1 );
              a = m;
              if (m) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const n = $ == null;
              if (n) {
                $( 100 );
              }
              else {
                const o = $( 1 );
                a = o;
                if (o) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const p = $ == null;
                if (p) {
                  $( 100 );
                }
                else {
                  const q = $( 1 );
                  a = q;
                  if (q) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const r = $ == null;
                  if (r) {
                    $( 100 );
                  }
                  else {
                    const s = $( 1 );
                    a = s;
                    if (s) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const t = $ == null;
                    if (t) {
                      $( 100 );
                    }
                    else {
                      const u = $( 1 );
                      a = u;
                      if (u) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const v = $ == null;
                      if (v) {
                        $( 100 );
                      }
                      else {
                        const w = $( 1 );
                        a = w;
                        if (w) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const x = $ == null;
                        if (x) {
                          $( 100 );
                        }
                        else {
                          const y = $( 1 );
                          a = y;
                          if (y) {
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
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
