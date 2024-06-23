# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || $($(2)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
loopStop: {
  $(100);
  const tmpCalleeParam = $(0);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  loopStop$1: {
    if (tmpClusterSSA_a) {
    } else {
      const tmpCalleeParam$1 = $(2);
      a = $(tmpCalleeParam$1);
      if (a) {
      } else {
        break loopStop;
      }
    }
    $(100);
    const tmpCalleeParam$2 = $(0);
    const tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
    loopStop$2: {
      if (tmpClusterSSA_a$1) {
      } else {
        const tmpCalleeParam$4 = $(2);
        a = $(tmpCalleeParam$4);
        if (a) {
        } else {
          break loopStop$1;
        }
      }
      $(100);
      const tmpCalleeParam$3 = $(0);
      const tmpClusterSSA_a$2 = $(tmpCalleeParam$3);
      loopStop$3: {
        if (tmpClusterSSA_a$2) {
        } else {
          const tmpCalleeParam$5 = $(2);
          a = $(tmpCalleeParam$5);
          if (a) {
          } else {
            break loopStop$2;
          }
        }
        $(100);
        const tmpCalleeParam$6 = $(0);
        const tmpClusterSSA_a$3 = $(tmpCalleeParam$6);
        loopStop$4: {
          if (tmpClusterSSA_a$3) {
          } else {
            const tmpCalleeParam$8 = $(2);
            a = $(tmpCalleeParam$8);
            if (a) {
            } else {
              break loopStop$3;
            }
          }
          $(100);
          const tmpCalleeParam$7 = $(0);
          const tmpClusterSSA_a$4 = $(tmpCalleeParam$7);
          loopStop$5: {
            if (tmpClusterSSA_a$4) {
            } else {
              const tmpCalleeParam$9 = $(2);
              a = $(tmpCalleeParam$9);
              if (a) {
              } else {
                break loopStop$4;
              }
            }
            $(100);
            const tmpCalleeParam$10 = $(0);
            const tmpClusterSSA_a$5 = $(tmpCalleeParam$10);
            loopStop$6: {
              if (tmpClusterSSA_a$5) {
              } else {
                const tmpCalleeParam$12 = $(2);
                a = $(tmpCalleeParam$12);
                if (a) {
                } else {
                  break loopStop$5;
                }
              }
              $(100);
              const tmpCalleeParam$11 = $(0);
              const tmpClusterSSA_a$6 = $(tmpCalleeParam$11);
              loopStop$7: {
                if (tmpClusterSSA_a$6) {
                } else {
                  const tmpCalleeParam$13 = $(2);
                  a = $(tmpCalleeParam$13);
                  if (a) {
                  } else {
                    break loopStop$6;
                  }
                }
                $(100);
                const tmpCalleeParam$14 = $(0);
                const tmpClusterSSA_a$7 = $(tmpCalleeParam$14);
                loopStop$8: {
                  if (tmpClusterSSA_a$7) {
                  } else {
                    const tmpCalleeParam$16 = $(2);
                    a = $(tmpCalleeParam$16);
                    if (a) {
                    } else {
                      break loopStop$7;
                    }
                  }
                  $(100);
                  const tmpCalleeParam$15 = $(0);
                  const tmpClusterSSA_a$8 = $(tmpCalleeParam$15);
                  loopStop$9: {
                    if (tmpClusterSSA_a$8) {
                    } else {
                      const tmpCalleeParam$17 = $(2);
                      a = $(tmpCalleeParam$17);
                      if (a) {
                      } else {
                        break loopStop$8;
                      }
                    }
                    $(100);
                    const tmpCalleeParam$18 = $(0);
                    const tmpClusterSSA_a$9 = $(tmpCalleeParam$18);
                    loopStop$10: {
                      if (tmpClusterSSA_a$9) {
                      } else {
                        const tmpCalleeParam$20 = $(2);
                        a = $(tmpCalleeParam$20);
                        if (a) {
                        } else {
                          break loopStop$9;
                        }
                      }
                      $(100);
                      const tmpCalleeParam$19 = $(0);
                      const tmpClusterSSA_a$10 = $(tmpCalleeParam$19);
                      if (tmpClusterSSA_a$10) {
                      } else {
                        const tmpCalleeParam$21 = $(2);
                        a = $(tmpCalleeParam$21);
                        if (a) {
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        $(100);
                        const tmpCalleeParam$22 = $(0);
                        a = $(tmpCalleeParam$22);
                        if (a) {
                        } else {
                          const tmpCalleeParam$24 = $(2);
                          a = $(tmpCalleeParam$24);
                          if (a) {
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
let a = {
  a: 999,
  b: 1000,
};
loopStop: {
  $( 100 );
  const b = $( 0 );
  const c = $( b );
  loopStop$1: {
    if (c) {

    }
    else {
      const d = $( 2 );
      a = $( d );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
    $( 100 );
    const e = $( 0 );
    const f = $( e );
    loopStop$2: {
      if (f) {

      }
      else {
        const g = $( 2 );
        a = $( g );
        if (a) {

        }
        else {
          break loopStop$1;
        }
      }
      $( 100 );
      const h = $( 0 );
      const i = $( h );
      loopStop$3: {
        if (i) {

        }
        else {
          const j = $( 2 );
          a = $( j );
          if (a) {

          }
          else {
            break loopStop$2;
          }
        }
        $( 100 );
        const k = $( 0 );
        const l = $( k );
        loopStop$4: {
          if (l) {

          }
          else {
            const m = $( 2 );
            a = $( m );
            if (a) {

            }
            else {
              break loopStop$3;
            }
          }
          $( 100 );
          const n = $( 0 );
          const o = $( n );
          loopStop$5: {
            if (o) {

            }
            else {
              const p = $( 2 );
              a = $( p );
              if (a) {

              }
              else {
                break loopStop$4;
              }
            }
            $( 100 );
            const q = $( 0 );
            const r = $( q );
            loopStop$6: {
              if (r) {

              }
              else {
                const s = $( 2 );
                a = $( s );
                if (a) {

                }
                else {
                  break loopStop$5;
                }
              }
              $( 100 );
              const t = $( 0 );
              const u = $( t );
              loopStop$7: {
                if (u) {

                }
                else {
                  const v = $( 2 );
                  a = $( v );
                  if (a) {

                  }
                  else {
                    break loopStop$6;
                  }
                }
                $( 100 );
                const w = $( 0 );
                const x = $( w );
                loopStop$8: {
                  if (x) {

                  }
                  else {
                    const y = $( 2 );
                    a = $( y );
                    if (a) {

                    }
                    else {
                      break loopStop$7;
                    }
                  }
                  $( 100 );
                  const z = $( 0 );
                  const 01 = $( z );
                  loopStop$9: {
                    if (01) {

                    }
                    else {
                      const 11 = $( 2 );
                      a = $( 11 );
                      if (a) {

                      }
                      else {
                        break loopStop$8;
                      }
                    }
                    $( 100 );
                    const 21 = $( 0 );
                    const 31 = $( 21 );
                    loopStop$10: {
                      if (31) {

                      }
                      else {
                        const 41 = $( 2 );
                        a = $( 41 );
                        if (a) {

                        }
                        else {
                          break loopStop$9;
                        }
                      }
                      $( 100 );
                      const 51 = $( 0 );
                      const 61 = $( 51 );
                      if (61) {

                      }
                      else {
                        const 71 = $( 2 );
                        a = $( 71 );
                        if (a) {

                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        $( 100 );
                        const 81 = $( 0 );
                        a = $( 81 );
                        if (a) {

                        }
                        else {
                          const 91 = $( 2 );
                          a = $( 91 );
                          if (a) {

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
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
