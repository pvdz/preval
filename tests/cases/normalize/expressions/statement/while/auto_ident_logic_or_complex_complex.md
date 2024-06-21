# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || $($(2))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || $($(2))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      $(100);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
loopStop: {
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCalleeParam$1 = $(2);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpCalleeParam$2 = $(0);
    const tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
      $(100);
    } else {
      const tmpCalleeParam$4 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$4);
      if (tmpClusterSSA_tmpIfTest$1) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpCalleeParam$3 = $(0);
      const tmpIfTest$2 = $(tmpCalleeParam$3);
      if (tmpIfTest$2) {
        $(100);
      } else {
        const tmpCalleeParam$5 = $(2);
        const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$5);
        if (tmpClusterSSA_tmpIfTest$2) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpCalleeParam$6 = $(0);
        const tmpIfTest$3 = $(tmpCalleeParam$6);
        if (tmpIfTest$3) {
          $(100);
        } else {
          const tmpCalleeParam$8 = $(2);
          const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$8);
          if (tmpClusterSSA_tmpIfTest$3) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpCalleeParam$7 = $(0);
          const tmpIfTest$4 = $(tmpCalleeParam$7);
          if (tmpIfTest$4) {
            $(100);
          } else {
            const tmpCalleeParam$9 = $(2);
            const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$9);
            if (tmpClusterSSA_tmpIfTest$4) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpCalleeParam$10 = $(0);
            const tmpIfTest$5 = $(tmpCalleeParam$10);
            if (tmpIfTest$5) {
              $(100);
            } else {
              const tmpCalleeParam$12 = $(2);
              const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$12);
              if (tmpClusterSSA_tmpIfTest$5) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpCalleeParam$11 = $(0);
              const tmpIfTest$6 = $(tmpCalleeParam$11);
              if (tmpIfTest$6) {
                $(100);
              } else {
                const tmpCalleeParam$13 = $(2);
                const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$13);
                if (tmpClusterSSA_tmpIfTest$6) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpCalleeParam$14 = $(0);
                const tmpIfTest$7 = $(tmpCalleeParam$14);
                if (tmpIfTest$7) {
                  $(100);
                } else {
                  const tmpCalleeParam$16 = $(2);
                  const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$16);
                  if (tmpClusterSSA_tmpIfTest$7) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpCalleeParam$15 = $(0);
                  const tmpIfTest$8 = $(tmpCalleeParam$15);
                  if (tmpIfTest$8) {
                    $(100);
                  } else {
                    const tmpCalleeParam$17 = $(2);
                    const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$17);
                    if (tmpClusterSSA_tmpIfTest$8) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpCalleeParam$18 = $(0);
                    const tmpIfTest$9 = $(tmpCalleeParam$18);
                    if (tmpIfTest$9) {
                      $(100);
                    } else {
                      const tmpCalleeParam$20 = $(2);
                      const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$20);
                      if (tmpClusterSSA_tmpIfTest$9) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpCalleeParam$19 = $(0);
                      const tmpIfTest$10 = $(tmpCalleeParam$19);
                      if (tmpIfTest$10) {
                        $(100);
                      } else {
                        const tmpCalleeParam$21 = $(2);
                        const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$21);
                        if (tmpClusterSSA_tmpIfTest$10) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpCalleeParam$22 = $(0);
                        const tmpIfTest$11 = $(tmpCalleeParam$22);
                        if (tmpIfTest$11) {
                          $(100);
                        } else {
                          const tmpCalleeParam$24 = $(2);
                          const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$24);
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
  const a = $( 0 );
  const b = $( a );
  if (b) {
    $( 100 );
  }
  else {
    const c = $( 2 );
    const d = $( c );
    if (d) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1: {
    const e = $( 0 );
    const f = $( e );
    if (f) {
      $( 100 );
    }
    else {
      const g = $( 2 );
      const h = $( g );
      if (h) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const i = $( 0 );
      const j = $( i );
      if (j) {
        $( 100 );
      }
      else {
        const k = $( 2 );
        const l = $( k );
        if (l) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const m = $( 0 );
        const n = $( m );
        if (n) {
          $( 100 );
        }
        else {
          const o = $( 2 );
          const p = $( o );
          if (p) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const q = $( 0 );
          const r = $( q );
          if (r) {
            $( 100 );
          }
          else {
            const s = $( 2 );
            const t = $( s );
            if (t) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const u = $( 0 );
            const v = $( u );
            if (v) {
              $( 100 );
            }
            else {
              const w = $( 2 );
              const x = $( w );
              if (x) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const y = $( 0 );
              const z = $( y );
              if (z) {
                $( 100 );
              }
              else {
                const 01 = $( 2 );
                const 11 = $( 01 );
                if (11) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const 21 = $( 0 );
                const 31 = $( 21 );
                if (31) {
                  $( 100 );
                }
                else {
                  const 41 = $( 2 );
                  const 51 = $( 41 );
                  if (51) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const 61 = $( 0 );
                  const 71 = $( 61 );
                  if (71) {
                    $( 100 );
                  }
                  else {
                    const 81 = $( 2 );
                    const 91 = $( 81 );
                    if (91) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const a1 = $( 0 );
                    const b1 = $( a1 );
                    if (b1) {
                      $( 100 );
                    }
                    else {
                      const c1 = $( 2 );
                      const d1 = $( c1 );
                      if (d1) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const e1 = $( 0 );
                      const f1 = $( e1 );
                      if (f1) {
                        $( 100 );
                      }
                      else {
                        const g1 = $( 2 );
                        const h1 = $( g1 );
                        if (h1) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const i1 = $( 0 );
                        const j1 = $( i1 );
                        if (j1) {
                          $( 100 );
                        }
                        else {
                          const k1 = $( 2 );
                          const l1 = $( k1 );
                          if (l1) {
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
const m1 = {
  a: 999,
  b: 1000,
};
$( m1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 0
 - 7: 0
 - 8: 2
 - 9: 2
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 2
 - 19: 2
 - 20: 100
 - 21: 0
 - 22: 0
 - 23: 2
 - 24: 2
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
