# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? 2 : $($(100))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? 2 : $($(100))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpIfTest = 2;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
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
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpCalleeParam = $(100);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam);
    if (tmpClusterSSA_tmpIfTest) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpIfTest$4 = $(1);
    if (tmpIfTest$4) {
      $(100);
    } else {
      const tmpCalleeParam$1 = $(100);
      const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$1);
      if (tmpClusterSSA_tmpIfTest$2) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
        $(100);
      } else {
        const tmpCalleeParam$2 = $(100);
        const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$2);
        if (tmpClusterSSA_tmpIfTest$1) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpIfTest$3 = $(1);
        if (tmpIfTest$3) {
          $(100);
        } else {
          const tmpCalleeParam$3 = $(100);
          const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$3);
          if (tmpClusterSSA_tmpIfTest$3) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpIfTest$5 = $(1);
          if (tmpIfTest$5) {
            $(100);
          } else {
            const tmpCalleeParam$4 = $(100);
            const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$4);
            if (tmpClusterSSA_tmpIfTest$4) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpIfTest$6 = $(1);
            if (tmpIfTest$6) {
              $(100);
            } else {
              const tmpCalleeParam$5 = $(100);
              const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$5);
              if (tmpClusterSSA_tmpIfTest$5) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpIfTest$7 = $(1);
              if (tmpIfTest$7) {
                $(100);
              } else {
                const tmpCalleeParam$6 = $(100);
                const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$6);
                if (tmpClusterSSA_tmpIfTest$6) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpIfTest$8 = $(1);
                if (tmpIfTest$8) {
                  $(100);
                } else {
                  const tmpCalleeParam$7 = $(100);
                  const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$7);
                  if (tmpClusterSSA_tmpIfTest$7) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpIfTest$9 = $(1);
                  if (tmpIfTest$9) {
                    $(100);
                  } else {
                    const tmpCalleeParam$8 = $(100);
                    const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$8);
                    if (tmpClusterSSA_tmpIfTest$8) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpIfTest$10 = $(1);
                    if (tmpIfTest$10) {
                      $(100);
                    } else {
                      const tmpCalleeParam$9 = $(100);
                      const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$9);
                      if (tmpClusterSSA_tmpIfTest$9) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpIfTest$11 = $(1);
                      if (tmpIfTest$11) {
                        $(100);
                      } else {
                        const tmpCalleeParam$10 = $(100);
                        const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$10);
                        if (tmpClusterSSA_tmpIfTest$10) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpIfTest$12 = $(1);
                        if (tmpIfTest$12) {
                          $(100);
                        } else {
                          const tmpCalleeParam$11 = $(100);
                          const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$11);
                          if (tmpClusterSSA_tmpIfTest$11) {
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
  const a = $( 1 );
  if (a) {
    $( 100 );
  }
  else {
    const b = $( 100 );
    const c = $( b );
    if (c) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const d = $( 1 );
    if (d) {
      $( 100 );
    }
    else {
      const e = $( 100 );
      const f = $( e );
      if (f) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const g = $( 1 );
      if (g) {
        $( 100 );
      }
      else {
        const h = $( 100 );
        const i = $( h );
        if (i) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const j = $( 1 );
        if (j) {
          $( 100 );
        }
        else {
          const k = $( 100 );
          const l = $( k );
          if (l) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const m = $( 1 );
          if (m) {
            $( 100 );
          }
          else {
            const n = $( 100 );
            const o = $( n );
            if (o) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const p = $( 1 );
            if (p) {
              $( 100 );
            }
            else {
              const q = $( 100 );
              const r = $( q );
              if (r) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const s = $( 1 );
              if (s) {
                $( 100 );
              }
              else {
                const t = $( 100 );
                const u = $( t );
                if (u) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const v = $( 1 );
                if (v) {
                  $( 100 );
                }
                else {
                  const w = $( 100 );
                  const x = $( w );
                  if (x) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const y = $( 1 );
                  if (y) {
                    $( 100 );
                  }
                  else {
                    const z = $( 100 );
                    const 01 = $( z );
                    if (01) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 11 = $( 1 );
                    if (11) {
                      $( 100 );
                    }
                    else {
                      const 21 = $( 100 );
                      const 31 = $( 21 );
                      if (31) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 41 = $( 1 );
                      if (41) {
                        $( 100 );
                      }
                      else {
                        const 51 = $( 100 );
                        const 61 = $( 51 );
                        if (61) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 71 = $( 1 );
                        if (71) {
                          $( 100 );
                        }
                        else {
                          const 81 = $( 100 );
                          const 91 = $( 81 );
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
