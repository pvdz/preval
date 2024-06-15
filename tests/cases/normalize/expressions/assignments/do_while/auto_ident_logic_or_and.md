# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || ($($(1)) && $($(2))))) {
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
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
    } else {
    }
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
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
      } else {
        break loopStop;
      }
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    $(100);
    const tmpCalleeParam$2 = $(0);
    const tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
    if (tmpClusterSSA_a$1) {
    } else {
      const tmpCalleeParam$4 = $(1);
      a = $(tmpCalleeParam$4);
      if (a) {
        const tmpCalleeParam$6 = $(2);
        a = $(tmpCalleeParam$6);
        if (a) {
        } else {
          break loopStop$1;
        }
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      $(100);
      const tmpCalleeParam$5 = $(0);
      const tmpClusterSSA_a$2 = $(tmpCalleeParam$5);
      if (tmpClusterSSA_a$2) {
      } else {
        const tmpCalleeParam$7 = $(1);
        a = $(tmpCalleeParam$7);
        if (a) {
          const tmpCalleeParam$9 = $(2);
          a = $(tmpCalleeParam$9);
          if (a) {
          } else {
            break loopStop$2;
          }
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        $(100);
        const tmpCalleeParam$8 = $(0);
        const tmpClusterSSA_a$3 = $(tmpCalleeParam$8);
        if (tmpClusterSSA_a$3) {
        } else {
          const tmpCalleeParam$10 = $(1);
          a = $(tmpCalleeParam$10);
          if (a) {
            const tmpCalleeParam$12 = $(2);
            a = $(tmpCalleeParam$12);
            if (a) {
            } else {
              break loopStop$3;
            }
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          $(100);
          const tmpCalleeParam$11 = $(0);
          const tmpClusterSSA_a$4 = $(tmpCalleeParam$11);
          if (tmpClusterSSA_a$4) {
          } else {
            const tmpCalleeParam$13 = $(1);
            a = $(tmpCalleeParam$13);
            if (a) {
              const tmpCalleeParam$15 = $(2);
              a = $(tmpCalleeParam$15);
              if (a) {
              } else {
                break loopStop$4;
              }
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            $(100);
            const tmpCalleeParam$14 = $(0);
            const tmpClusterSSA_a$5 = $(tmpCalleeParam$14);
            if (tmpClusterSSA_a$5) {
            } else {
              const tmpCalleeParam$16 = $(1);
              a = $(tmpCalleeParam$16);
              if (a) {
                const tmpCalleeParam$18 = $(2);
                a = $(tmpCalleeParam$18);
                if (a) {
                } else {
                  break loopStop$5;
                }
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              $(100);
              const tmpCalleeParam$17 = $(0);
              const tmpClusterSSA_a$6 = $(tmpCalleeParam$17);
              if (tmpClusterSSA_a$6) {
              } else {
                const tmpCalleeParam$19 = $(1);
                a = $(tmpCalleeParam$19);
                if (a) {
                  const tmpCalleeParam$21 = $(2);
                  a = $(tmpCalleeParam$21);
                  if (a) {
                  } else {
                    break loopStop$6;
                  }
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                $(100);
                const tmpCalleeParam$20 = $(0);
                const tmpClusterSSA_a$7 = $(tmpCalleeParam$20);
                if (tmpClusterSSA_a$7) {
                } else {
                  const tmpCalleeParam$22 = $(1);
                  a = $(tmpCalleeParam$22);
                  if (a) {
                    const tmpCalleeParam$24 = $(2);
                    a = $(tmpCalleeParam$24);
                    if (a) {
                    } else {
                      break loopStop$7;
                    }
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  $(100);
                  const tmpCalleeParam$23 = $(0);
                  const tmpClusterSSA_a$8 = $(tmpCalleeParam$23);
                  if (tmpClusterSSA_a$8) {
                  } else {
                    const tmpCalleeParam$25 = $(1);
                    a = $(tmpCalleeParam$25);
                    if (a) {
                      const tmpCalleeParam$27 = $(2);
                      a = $(tmpCalleeParam$27);
                      if (a) {
                      } else {
                        break loopStop$8;
                      }
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    $(100);
                    const tmpCalleeParam$26 = $(0);
                    const tmpClusterSSA_a$9 = $(tmpCalleeParam$26);
                    if (tmpClusterSSA_a$9) {
                    } else {
                      const tmpCalleeParam$28 = $(1);
                      a = $(tmpCalleeParam$28);
                      if (a) {
                        const tmpCalleeParam$30 = $(2);
                        a = $(tmpCalleeParam$30);
                        if (a) {
                        } else {
                          break loopStop$9;
                        }
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      $(100);
                      const tmpCalleeParam$29 = $(0);
                      const tmpClusterSSA_a$10 = $(tmpCalleeParam$29);
                      if (tmpClusterSSA_a$10) {
                      } else {
                        const tmpCalleeParam$31 = $(1);
                        a = $(tmpCalleeParam$31);
                        if (a) {
                          const tmpCalleeParam$33 = $(2);
                          a = $(tmpCalleeParam$33);
                          if (a) {
                          } else {
                            break loopStop$10;
                          }
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        $(100);
                        const tmpCalleeParam$32 = $(0);
                        a = $(tmpCalleeParam$32);
                        if (a) {
                        } else {
                          const tmpCalleeParam$34 = $(1);
                          a = $(tmpCalleeParam$34);
                          if (a) {
                            const tmpCalleeParam$36 = $(2);
                            a = $(tmpCalleeParam$36);
                            if (a) {
                            } else {
                              break;
                            }
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
  if (c) {

  }
  else {
    const d = $( 1 );
    a = $( d );
    if (a) {
      const e = $( 2 );
      a = $( e );
      if (a) {

      }
      else {
        break loopStop;
      }
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    $( 100 );
    const f = $( 0 );
    const g = $( f );
    if (g) {

    }
    else {
      const h = $( 1 );
      a = $( h );
      if (a) {
        const i = $( 2 );
        a = $( i );
        if (a) {

        }
        else {
          break loopStop$1;
        }
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      $( 100 );
      const j = $( 0 );
      const k = $( j );
      if (k) {

      }
      else {
        const l = $( 1 );
        a = $( l );
        if (a) {
          const m = $( 2 );
          a = $( m );
          if (a) {

          }
          else {
            break loopStop$2;
          }
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        $( 100 );
        const n = $( 0 );
        const o = $( n );
        if (o) {

        }
        else {
          const p = $( 1 );
          a = $( p );
          if (a) {
            const q = $( 2 );
            a = $( q );
            if (a) {

            }
            else {
              break loopStop$3;
            }
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          $( 100 );
          const r = $( 0 );
          const s = $( r );
          if (s) {

          }
          else {
            const t = $( 1 );
            a = $( t );
            if (a) {
              const u = $( 2 );
              a = $( u );
              if (a) {

              }
              else {
                break loopStop$4;
              }
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            $( 100 );
            const v = $( 0 );
            const w = $( v );
            if (w) {

            }
            else {
              const x = $( 1 );
              a = $( x );
              if (a) {
                const y = $( 2 );
                a = $( y );
                if (a) {

                }
                else {
                  break loopStop$5;
                }
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              $( 100 );
              const z = $( 0 );
              const 01 = $( z );
              if (01) {

              }
              else {
                const 11 = $( 1 );
                a = $( 11 );
                if (a) {
                  const 21 = $( 2 );
                  a = $( 21 );
                  if (a) {

                  }
                  else {
                    break loopStop$6;
                  }
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                $( 100 );
                const 31 = $( 0 );
                const 41 = $( 31 );
                if (41) {

                }
                else {
                  const 51 = $( 1 );
                  a = $( 51 );
                  if (a) {
                    const 61 = $( 2 );
                    a = $( 61 );
                    if (a) {

                    }
                    else {
                      break loopStop$7;
                    }
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  $( 100 );
                  const 71 = $( 0 );
                  const 81 = $( 71 );
                  if (81) {

                  }
                  else {
                    const 91 = $( 1 );
                    a = $( 91 );
                    if (a) {
                      const a1 = $( 2 );
                      a = $( a1 );
                      if (a) {

                      }
                      else {
                        break loopStop$8;
                      }
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    $( 100 );
                    const b1 = $( 0 );
                    const c1 = $( b1 );
                    if (c1) {

                    }
                    else {
                      const d1 = $( 1 );
                      a = $( d1 );
                      if (a) {
                        const e1 = $( 2 );
                        a = $( e1 );
                        if (a) {

                        }
                        else {
                          break loopStop$9;
                        }
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      $( 100 );
                      const f1 = $( 0 );
                      const g1 = $( f1 );
                      if (g1) {

                      }
                      else {
                        const h1 = $( 1 );
                        a = $( h1 );
                        if (a) {
                          const i1 = $( 2 );
                          a = $( i1 );
                          if (a) {

                          }
                          else {
                            break loopStop$10;
                          }
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        $( 100 );
                        const j1 = $( 0 );
                        a = $( j1 );
                        if (a) {

                        }
                        else {
                          const k1 = $( 1 );
                          a = $( k1 );
                          if (a) {
                            const l1 = $( 2 );
                            a = $( l1 );
                            if (a) {

                            }
                            else {
                              break;
                            }
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
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
