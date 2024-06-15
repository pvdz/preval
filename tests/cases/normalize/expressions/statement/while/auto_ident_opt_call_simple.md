# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > While > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($?.(1)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($?.(1)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpIfTest = tmpChainElementCall;
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
  const tmpIfTest$1 = $ == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainElementCall = $(1);
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
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop: {
  const a = $ == null;
  if (a) {
    $( 100 );
  }
  else {
    const b = $( 1 );
    if (b) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const c = $ == null;
    if (c) {
      $( 100 );
    }
    else {
      const d = $( 1 );
      if (d) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const e = $ == null;
      if (e) {
        $( 100 );
      }
      else {
        const f = $( 1 );
        if (f) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const g = $ == null;
        if (g) {
          $( 100 );
        }
        else {
          const h = $( 1 );
          if (h) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const i = $ == null;
          if (i) {
            $( 100 );
          }
          else {
            const j = $( 1 );
            if (j) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const k = $ == null;
            if (k) {
              $( 100 );
            }
            else {
              const l = $( 1 );
              if (l) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const m = $ == null;
              if (m) {
                $( 100 );
              }
              else {
                const n = $( 1 );
                if (n) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const o = $ == null;
                if (o) {
                  $( 100 );
                }
                else {
                  const p = $( 1 );
                  if (p) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const q = $ == null;
                  if (q) {
                    $( 100 );
                  }
                  else {
                    const r = $( 1 );
                    if (r) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const s = $ == null;
                    if (s) {
                      $( 100 );
                    }
                    else {
                      const t = $( 1 );
                      if (t) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const u = $ == null;
                      if (u) {
                        $( 100 );
                      }
                      else {
                        const v = $( 1 );
                        if (v) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const w = $ == null;
                        if (w) {
                          $( 100 );
                        }
                        else {
                          const x = $( 1 );
                          if (x) {
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
const y = {
  a: 999,
  b: 1000,
};
$( y );
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
