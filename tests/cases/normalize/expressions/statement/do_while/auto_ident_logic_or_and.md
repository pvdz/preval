# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(0)) || ($($(1)) && $($(2)))) {
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
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
      if (tmpIfTest) {
      } else {
        break;
      }
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
  $(100);
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      const tmpCalleeParam$3 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
      if (tmpClusterSSA_tmpIfTest$1) {
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
    const tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$4 = $(1);
      const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$4);
      if (tmpClusterSSA_tmpIfTest$2) {
        const tmpCalleeParam$6 = $(2);
        const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$6);
        if (tmpClusterSSA_tmpIfTest$4) {
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
      const tmpIfTest$2 = $(tmpCalleeParam$5);
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$7 = $(1);
        const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$7);
        if (tmpClusterSSA_tmpIfTest$3) {
          const tmpCalleeParam$9 = $(2);
          const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$9);
          if (tmpClusterSSA_tmpIfTest$5) {
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
        const tmpIfTest$3 = $(tmpCalleeParam$8);
        if (tmpIfTest$3) {
        } else {
          const tmpCalleeParam$10 = $(1);
          const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$10);
          if (tmpClusterSSA_tmpIfTest$6) {
            const tmpCalleeParam$12 = $(2);
            const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$12);
            if (tmpClusterSSA_tmpIfTest$8) {
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
          const tmpIfTest$4 = $(tmpCalleeParam$11);
          if (tmpIfTest$4) {
          } else {
            const tmpCalleeParam$13 = $(1);
            const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$13);
            if (tmpClusterSSA_tmpIfTest$7) {
              const tmpCalleeParam$15 = $(2);
              const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$15);
              if (tmpClusterSSA_tmpIfTest$9) {
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
            const tmpIfTest$5 = $(tmpCalleeParam$14);
            if (tmpIfTest$5) {
            } else {
              const tmpCalleeParam$16 = $(1);
              const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$16);
              if (tmpClusterSSA_tmpIfTest$10) {
                const tmpCalleeParam$18 = $(2);
                const tmpClusterSSA_tmpIfTest$12 = $(tmpCalleeParam$18);
                if (tmpClusterSSA_tmpIfTest$12) {
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
              const tmpIfTest$6 = $(tmpCalleeParam$17);
              if (tmpIfTest$6) {
              } else {
                const tmpCalleeParam$19 = $(1);
                const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$19);
                if (tmpClusterSSA_tmpIfTest$11) {
                  const tmpCalleeParam$21 = $(2);
                  const tmpClusterSSA_tmpIfTest$13 = $(tmpCalleeParam$21);
                  if (tmpClusterSSA_tmpIfTest$13) {
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
                const tmpIfTest$7 = $(tmpCalleeParam$20);
                if (tmpIfTest$7) {
                } else {
                  const tmpCalleeParam$22 = $(1);
                  const tmpClusterSSA_tmpIfTest$14 = $(tmpCalleeParam$22);
                  if (tmpClusterSSA_tmpIfTest$14) {
                    const tmpCalleeParam$24 = $(2);
                    const tmpClusterSSA_tmpIfTest$16 = $(tmpCalleeParam$24);
                    if (tmpClusterSSA_tmpIfTest$16) {
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
                  const tmpIfTest$8 = $(tmpCalleeParam$23);
                  if (tmpIfTest$8) {
                  } else {
                    const tmpCalleeParam$25 = $(1);
                    const tmpClusterSSA_tmpIfTest$15 = $(tmpCalleeParam$25);
                    if (tmpClusterSSA_tmpIfTest$15) {
                      const tmpCalleeParam$27 = $(2);
                      const tmpClusterSSA_tmpIfTest$17 = $(tmpCalleeParam$27);
                      if (tmpClusterSSA_tmpIfTest$17) {
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
                    const tmpIfTest$9 = $(tmpCalleeParam$26);
                    if (tmpIfTest$9) {
                    } else {
                      const tmpCalleeParam$28 = $(1);
                      const tmpClusterSSA_tmpIfTest$18 = $(tmpCalleeParam$28);
                      if (tmpClusterSSA_tmpIfTest$18) {
                        const tmpCalleeParam$30 = $(2);
                        const tmpClusterSSA_tmpIfTest$20 = $(tmpCalleeParam$30);
                        if (tmpClusterSSA_tmpIfTest$20) {
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
                      const tmpIfTest$10 = $(tmpCalleeParam$29);
                      if (tmpIfTest$10) {
                      } else {
                        const tmpCalleeParam$31 = $(1);
                        const tmpClusterSSA_tmpIfTest$19 = $(tmpCalleeParam$31);
                        if (tmpClusterSSA_tmpIfTest$19) {
                          const tmpCalleeParam$33 = $(2);
                          const tmpClusterSSA_tmpIfTest$21 = $(tmpCalleeParam$33);
                          if (tmpClusterSSA_tmpIfTest$21) {
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
                        const tmpIfTest$11 = $(tmpCalleeParam$32);
                        if (tmpIfTest$11) {
                        } else {
                          const tmpCalleeParam$34 = $(1);
                          const tmpClusterSSA_tmpIfTest$22 = $(tmpCalleeParam$34);
                          if (tmpClusterSSA_tmpIfTest$22) {
                            const tmpCalleeParam$36 = $(2);
                            const tmpClusterSSA_tmpIfTest$24 = $(tmpCalleeParam$36);
                            if (tmpClusterSSA_tmpIfTest$24) {
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
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop: {
  $( 100 );
  const a = $( 0 );
  const b = $( a );
  if (b) {

  }
  else {
    const c = $( 1 );
    const d = $( c );
    if (d) {
      const e = $( 2 );
      const f = $( e );
      if (f) {

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
    const g = $( 0 );
    const h = $( g );
    if (h) {

    }
    else {
      const i = $( 1 );
      const j = $( i );
      if (j) {
        const k = $( 2 );
        const l = $( k );
        if (l) {

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
      const m = $( 0 );
      const n = $( m );
      if (n) {

      }
      else {
        const o = $( 1 );
        const p = $( o );
        if (p) {
          const q = $( 2 );
          const r = $( q );
          if (r) {

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
        const s = $( 0 );
        const t = $( s );
        if (t) {

        }
        else {
          const u = $( 1 );
          const v = $( u );
          if (v) {
            const w = $( 2 );
            const x = $( w );
            if (x) {

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
          const y = $( 0 );
          const z = $( y );
          if (z) {

          }
          else {
            const 01 = $( 1 );
            const 11 = $( 01 );
            if (11) {
              const 21 = $( 2 );
              const 31 = $( 21 );
              if (31) {

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
            const 41 = $( 0 );
            const 51 = $( 41 );
            if (51) {

            }
            else {
              const 61 = $( 1 );
              const 71 = $( 61 );
              if (71) {
                const 81 = $( 2 );
                const 91 = $( 81 );
                if (91) {

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
              const a1 = $( 0 );
              const b1 = $( a1 );
              if (b1) {

              }
              else {
                const c1 = $( 1 );
                const d1 = $( c1 );
                if (d1) {
                  const e1 = $( 2 );
                  const f1 = $( e1 );
                  if (f1) {

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
                const g1 = $( 0 );
                const h1 = $( g1 );
                if (h1) {

                }
                else {
                  const i1 = $( 1 );
                  const j1 = $( i1 );
                  if (j1) {
                    const k1 = $( 2 );
                    const l1 = $( k1 );
                    if (l1) {

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
                  const m1 = $( 0 );
                  const n1 = $( m1 );
                  if (n1) {

                  }
                  else {
                    const o1 = $( 1 );
                    const p1 = $( o1 );
                    if (p1) {
                      const q1 = $( 2 );
                      const r1 = $( q1 );
                      if (r1) {

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
                    const s1 = $( 0 );
                    const t1 = $( s1 );
                    if (t1) {

                    }
                    else {
                      const u1 = $( 1 );
                      const v1 = $( u1 );
                      if (v1) {
                        const w1 = $( 2 );
                        const x1 = $( w1 );
                        if (x1) {

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
                      const y1 = $( 0 );
                      const z1 = $( y1 );
                      if (z1) {

                      }
                      else {
                        const 02 = $( 1 );
                        const 12 = $( 02 );
                        if (12) {
                          const 22 = $( 2 );
                          const 32 = $( 22 );
                          if (32) {

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
                        const 42 = $( 0 );
                        const 52 = $( 42 );
                        if (52) {

                        }
                        else {
                          const 62 = $( 1 );
                          const 72 = $( 62 );
                          if (72) {
                            const 82 = $( 2 );
                            const 92 = $( 82 );
                            if (92) {

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
const a2 = {
  a: 999,
  b: 1000,
};
$( a2 );
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
