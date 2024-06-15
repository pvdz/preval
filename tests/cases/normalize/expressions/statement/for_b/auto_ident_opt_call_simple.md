# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > For b > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $?.(1); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($?.(1)) {
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
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpIfTest = tmpChainElementCall;
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
  const tmpIfTest$1 = $ == null;
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpChainElementCall = $(1);
    if (tmpChainElementCall) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpIfTest$2 = $ == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainElementCall$1 = $(1);
      if (tmpChainElementCall$1) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpIfTest$3 = $ == null;
      if (tmpIfTest$3) {
        $(1);
      } else {
        const tmpChainElementCall$2 = $(1);
        if (tmpChainElementCall$2) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpIfTest$4 = $ == null;
        if (tmpIfTest$4) {
          $(1);
        } else {
          const tmpChainElementCall$3 = $(1);
          if (tmpChainElementCall$3) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpIfTest$5 = $ == null;
          if (tmpIfTest$5) {
            $(1);
          } else {
            const tmpChainElementCall$4 = $(1);
            if (tmpChainElementCall$4) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpIfTest$6 = $ == null;
            if (tmpIfTest$6) {
              $(1);
            } else {
              const tmpChainElementCall$5 = $(1);
              if (tmpChainElementCall$5) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpIfTest$7 = $ == null;
              if (tmpIfTest$7) {
                $(1);
              } else {
                const tmpChainElementCall$6 = $(1);
                if (tmpChainElementCall$6) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpIfTest$8 = $ == null;
                if (tmpIfTest$8) {
                  $(1);
                } else {
                  const tmpChainElementCall$7 = $(1);
                  if (tmpChainElementCall$7) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpIfTest$9 = $ == null;
                  if (tmpIfTest$9) {
                    $(1);
                  } else {
                    const tmpChainElementCall$8 = $(1);
                    if (tmpChainElementCall$8) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpIfTest$10 = $ == null;
                    if (tmpIfTest$10) {
                      $(1);
                    } else {
                      const tmpChainElementCall$9 = $(1);
                      if (tmpChainElementCall$9) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpIfTest$11 = $ == null;
                      if (tmpIfTest$11) {
                        $(1);
                      } else {
                        const tmpChainElementCall$10 = $(1);
                        if (tmpChainElementCall$10) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpIfTest$12 = $ == null;
                        if (tmpIfTest$12) {
                          $(1);
                        } else {
                          const tmpChainElementCall$11 = $(1);
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
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop: {
  const a = $ == null;
  if (a) {
    $( 1 );
  }
  else {
    const b = $( 1 );
    if (b) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const c = $ == null;
    if (c) {
      $( 1 );
    }
    else {
      const d = $( 1 );
      if (d) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const e = $ == null;
      if (e) {
        $( 1 );
      }
      else {
        const f = $( 1 );
        if (f) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const g = $ == null;
        if (g) {
          $( 1 );
        }
        else {
          const h = $( 1 );
          if (h) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const i = $ == null;
          if (i) {
            $( 1 );
          }
          else {
            const j = $( 1 );
            if (j) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const k = $ == null;
            if (k) {
              $( 1 );
            }
            else {
              const l = $( 1 );
              if (l) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const m = $ == null;
              if (m) {
                $( 1 );
              }
              else {
                const n = $( 1 );
                if (n) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const o = $ == null;
                if (o) {
                  $( 1 );
                }
                else {
                  const p = $( 1 );
                  if (p) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const q = $ == null;
                  if (q) {
                    $( 1 );
                  }
                  else {
                    const r = $( 1 );
                    if (r) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const s = $ == null;
                    if (s) {
                      $( 1 );
                    }
                    else {
                      const t = $( 1 );
                      if (t) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const u = $ == null;
                      if (u) {
                        $( 1 );
                      }
                      else {
                        const v = $( 1 );
                        if (v) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const w = $ == null;
                        if (w) {
                          $( 1 );
                        }
                        else {
                          const x = $( 1 );
                          if (x) {
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
