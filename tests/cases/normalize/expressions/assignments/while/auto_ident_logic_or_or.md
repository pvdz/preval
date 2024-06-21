# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > While > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(1)) || $($(2)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(0)) || $($(1)) || $($(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
    }
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
let a = { a: 999, b: 1000 };
loopStop: {
  const tmpCalleeParam = $(0);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(100);
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_a$1 = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a$1) {
      $(100);
    } else {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      if (a) {
        $(100);
      } else {
        break loopStop;
      }
    }
  }
  loopStop$1: {
    const tmpCalleeParam$2 = $(0);
    const tmpClusterSSA_a$4 = $(tmpCalleeParam$2);
    if (tmpClusterSSA_a$4) {
      $(100);
    } else {
      const tmpCalleeParam$4 = $(1);
      const tmpClusterSSA_a$3 = $(tmpCalleeParam$4);
      if (tmpClusterSSA_a$3) {
        $(100);
      } else {
        const tmpCalleeParam$6 = $(2);
        a = $(tmpCalleeParam$6);
        if (a) {
          $(100);
        } else {
          break loopStop$1;
        }
      }
    }
    loopStop$2: {
      const tmpCalleeParam$5 = $(0);
      const tmpClusterSSA_a$6 = $(tmpCalleeParam$5);
      if (tmpClusterSSA_a$6) {
        $(100);
      } else {
        const tmpCalleeParam$7 = $(1);
        const tmpClusterSSA_a$2 = $(tmpCalleeParam$7);
        if (tmpClusterSSA_a$2) {
          $(100);
        } else {
          const tmpCalleeParam$9 = $(2);
          a = $(tmpCalleeParam$9);
          if (a) {
            $(100);
          } else {
            break loopStop$2;
          }
        }
      }
      loopStop$3: {
        const tmpCalleeParam$8 = $(0);
        const tmpClusterSSA_a$8 = $(tmpCalleeParam$8);
        if (tmpClusterSSA_a$8) {
          $(100);
        } else {
          const tmpCalleeParam$10 = $(1);
          const tmpClusterSSA_a$5 = $(tmpCalleeParam$10);
          if (tmpClusterSSA_a$5) {
            $(100);
          } else {
            const tmpCalleeParam$12 = $(2);
            a = $(tmpCalleeParam$12);
            if (a) {
              $(100);
            } else {
              break loopStop$3;
            }
          }
        }
        loopStop$4: {
          const tmpCalleeParam$11 = $(0);
          const tmpClusterSSA_a$10 = $(tmpCalleeParam$11);
          if (tmpClusterSSA_a$10) {
            $(100);
          } else {
            const tmpCalleeParam$13 = $(1);
            const tmpClusterSSA_a$7 = $(tmpCalleeParam$13);
            if (tmpClusterSSA_a$7) {
              $(100);
            } else {
              const tmpCalleeParam$15 = $(2);
              a = $(tmpCalleeParam$15);
              if (a) {
                $(100);
              } else {
                break loopStop$4;
              }
            }
          }
          loopStop$5: {
            const tmpCalleeParam$14 = $(0);
            const tmpClusterSSA_a$12 = $(tmpCalleeParam$14);
            if (tmpClusterSSA_a$12) {
              $(100);
            } else {
              const tmpCalleeParam$16 = $(1);
              const tmpClusterSSA_a$9 = $(tmpCalleeParam$16);
              if (tmpClusterSSA_a$9) {
                $(100);
              } else {
                const tmpCalleeParam$18 = $(2);
                a = $(tmpCalleeParam$18);
                if (a) {
                  $(100);
                } else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6: {
              const tmpCalleeParam$17 = $(0);
              const tmpClusterSSA_a$14 = $(tmpCalleeParam$17);
              if (tmpClusterSSA_a$14) {
                $(100);
              } else {
                const tmpCalleeParam$19 = $(1);
                const tmpClusterSSA_a$11 = $(tmpCalleeParam$19);
                if (tmpClusterSSA_a$11) {
                  $(100);
                } else {
                  const tmpCalleeParam$21 = $(2);
                  a = $(tmpCalleeParam$21);
                  if (a) {
                    $(100);
                  } else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7: {
                const tmpCalleeParam$20 = $(0);
                const tmpClusterSSA_a$16 = $(tmpCalleeParam$20);
                if (tmpClusterSSA_a$16) {
                  $(100);
                } else {
                  const tmpCalleeParam$22 = $(1);
                  const tmpClusterSSA_a$13 = $(tmpCalleeParam$22);
                  if (tmpClusterSSA_a$13) {
                    $(100);
                  } else {
                    const tmpCalleeParam$24 = $(2);
                    a = $(tmpCalleeParam$24);
                    if (a) {
                      $(100);
                    } else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8: {
                  const tmpCalleeParam$23 = $(0);
                  const tmpClusterSSA_a$18 = $(tmpCalleeParam$23);
                  if (tmpClusterSSA_a$18) {
                    $(100);
                  } else {
                    const tmpCalleeParam$25 = $(1);
                    const tmpClusterSSA_a$15 = $(tmpCalleeParam$25);
                    if (tmpClusterSSA_a$15) {
                      $(100);
                    } else {
                      const tmpCalleeParam$27 = $(2);
                      a = $(tmpCalleeParam$27);
                      if (a) {
                        $(100);
                      } else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9: {
                    const tmpCalleeParam$26 = $(0);
                    const tmpClusterSSA_a$20 = $(tmpCalleeParam$26);
                    if (tmpClusterSSA_a$20) {
                      $(100);
                    } else {
                      const tmpCalleeParam$28 = $(1);
                      const tmpClusterSSA_a$17 = $(tmpCalleeParam$28);
                      if (tmpClusterSSA_a$17) {
                        $(100);
                      } else {
                        const tmpCalleeParam$30 = $(2);
                        a = $(tmpCalleeParam$30);
                        if (a) {
                          $(100);
                        } else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10: {
                      const tmpCalleeParam$29 = $(0);
                      const tmpClusterSSA_a$22 = $(tmpCalleeParam$29);
                      if (tmpClusterSSA_a$22) {
                        $(100);
                      } else {
                        const tmpCalleeParam$31 = $(1);
                        const tmpClusterSSA_a$19 = $(tmpCalleeParam$31);
                        if (tmpClusterSSA_a$19) {
                          $(100);
                        } else {
                          const tmpCalleeParam$33 = $(2);
                          a = $(tmpCalleeParam$33);
                          if (a) {
                            $(100);
                          } else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpCalleeParam$32 = $(0);
                        a = $(tmpCalleeParam$32);
                        if (a) {
                          $(100);
                        } else {
                          const tmpCalleeParam$34 = $(1);
                          const tmpClusterSSA_a$21 = $(tmpCalleeParam$34);
                          if (tmpClusterSSA_a$21) {
                            $(100);
                          } else {
                            const tmpCalleeParam$36 = $(2);
                            a = $(tmpCalleeParam$36);
                            if (a) {
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
  const b = $( 0 );
  const c = $( b );
  if (c) {
    $( 100 );
  }
  else {
    const d = $( 1 );
    const e = $( d );
    if (e) {
      $( 100 );
    }
    else {
      const f = $( 2 );
      a = $( f );
      if (a) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
  }
  loopStop$1: {
    const g = $( 0 );
    const h = $( g );
    if (h) {
      $( 100 );
    }
    else {
      const i = $( 1 );
      const j = $( i );
      if (j) {
        $( 100 );
      }
      else {
        const k = $( 2 );
        a = $( k );
        if (a) {
          $( 100 );
        }
        else {
          break loopStop$1;
        }
      }
    }
    loopStop$2: {
      const l = $( 0 );
      const m = $( l );
      if (m) {
        $( 100 );
      }
      else {
        const n = $( 1 );
        const o = $( n );
        if (o) {
          $( 100 );
        }
        else {
          const p = $( 2 );
          a = $( p );
          if (a) {
            $( 100 );
          }
          else {
            break loopStop$2;
          }
        }
      }
      loopStop$3: {
        const q = $( 0 );
        const r = $( q );
        if (r) {
          $( 100 );
        }
        else {
          const s = $( 1 );
          const t = $( s );
          if (t) {
            $( 100 );
          }
          else {
            const u = $( 2 );
            a = $( u );
            if (a) {
              $( 100 );
            }
            else {
              break loopStop$3;
            }
          }
        }
        loopStop$4: {
          const v = $( 0 );
          const w = $( v );
          if (w) {
            $( 100 );
          }
          else {
            const x = $( 1 );
            const y = $( x );
            if (y) {
              $( 100 );
            }
            else {
              const z = $( 2 );
              a = $( z );
              if (a) {
                $( 100 );
              }
              else {
                break loopStop$4;
              }
            }
          }
          loopStop$5: {
            const 01 = $( 0 );
            const 11 = $( 01 );
            if (11) {
              $( 100 );
            }
            else {
              const 21 = $( 1 );
              const 31 = $( 21 );
              if (31) {
                $( 100 );
              }
              else {
                const 41 = $( 2 );
                a = $( 41 );
                if (a) {
                  $( 100 );
                }
                else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6: {
              const 51 = $( 0 );
              const 61 = $( 51 );
              if (61) {
                $( 100 );
              }
              else {
                const 71 = $( 1 );
                const 81 = $( 71 );
                if (81) {
                  $( 100 );
                }
                else {
                  const 91 = $( 2 );
                  a = $( 91 );
                  if (a) {
                    $( 100 );
                  }
                  else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7: {
                const a1 = $( 0 );
                const b1 = $( a1 );
                if (b1) {
                  $( 100 );
                }
                else {
                  const c1 = $( 1 );
                  const d1 = $( c1 );
                  if (d1) {
                    $( 100 );
                  }
                  else {
                    const e1 = $( 2 );
                    a = $( e1 );
                    if (a) {
                      $( 100 );
                    }
                    else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8: {
                  const f1 = $( 0 );
                  const g1 = $( f1 );
                  if (g1) {
                    $( 100 );
                  }
                  else {
                    const h1 = $( 1 );
                    const i1 = $( h1 );
                    if (i1) {
                      $( 100 );
                    }
                    else {
                      const j1 = $( 2 );
                      a = $( j1 );
                      if (a) {
                        $( 100 );
                      }
                      else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9: {
                    const k1 = $( 0 );
                    const l1 = $( k1 );
                    if (l1) {
                      $( 100 );
                    }
                    else {
                      const m1 = $( 1 );
                      const n1 = $( m1 );
                      if (n1) {
                        $( 100 );
                      }
                      else {
                        const o1 = $( 2 );
                        a = $( o1 );
                        if (a) {
                          $( 100 );
                        }
                        else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10: {
                      const p1 = $( 0 );
                      const q1 = $( p1 );
                      if (q1) {
                        $( 100 );
                      }
                      else {
                        const r1 = $( 1 );
                        const s1 = $( r1 );
                        if (s1) {
                          $( 100 );
                        }
                        else {
                          const t1 = $( 2 );
                          a = $( t1 );
                          if (a) {
                            $( 100 );
                          }
                          else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const u1 = $( 0 );
                        a = $( u1 );
                        if (a) {
                          $( 100 );
                        }
                        else {
                          const v1 = $( 1 );
                          const w1 = $( v1 );
                          if (w1) {
                            $( 100 );
                          }
                          else {
                            const x1 = $( 2 );
                            a = $( x1 );
                            if (a) {
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
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 0
 - 7: 0
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: 0
 - 22: 0
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
