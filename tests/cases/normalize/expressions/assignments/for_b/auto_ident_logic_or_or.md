# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || $($(1)) || $($(2))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($(0)) || $($(1)) || $($(2)))) {
    $(1);
  }
}
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
    $(1);
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
  loopStop$1: {
    if (tmpClusterSSA_a) {
      $(1);
    } else {
      const tmpCalleeParam$1 = $(1);
      const tmpClusterSSA_a$1 = $(tmpCalleeParam$1);
      if (tmpClusterSSA_a$1) {
        $(1);
      } else {
        const tmpCalleeParam$3 = $(2);
        a = $(tmpCalleeParam$3);
        if (a) {
          $(1);
        } else {
          break loopStop;
        }
      }
    }
    const tmpCalleeParam$2 = $(0);
    const tmpClusterSSA_a$4 = $(tmpCalleeParam$2);
    loopStop$2: {
      if (tmpClusterSSA_a$4) {
        $(1);
      } else {
        const tmpCalleeParam$4 = $(1);
        const tmpClusterSSA_a$3 = $(tmpCalleeParam$4);
        if (tmpClusterSSA_a$3) {
          $(1);
        } else {
          const tmpCalleeParam$6 = $(2);
          a = $(tmpCalleeParam$6);
          if (a) {
            $(1);
          } else {
            break loopStop$1;
          }
        }
      }
      const tmpCalleeParam$5 = $(0);
      const tmpClusterSSA_a$6 = $(tmpCalleeParam$5);
      loopStop$3: {
        if (tmpClusterSSA_a$6) {
          $(1);
        } else {
          const tmpCalleeParam$7 = $(1);
          const tmpClusterSSA_a$2 = $(tmpCalleeParam$7);
          if (tmpClusterSSA_a$2) {
            $(1);
          } else {
            const tmpCalleeParam$9 = $(2);
            a = $(tmpCalleeParam$9);
            if (a) {
              $(1);
            } else {
              break loopStop$2;
            }
          }
        }
        const tmpCalleeParam$8 = $(0);
        const tmpClusterSSA_a$8 = $(tmpCalleeParam$8);
        loopStop$4: {
          if (tmpClusterSSA_a$8) {
            $(1);
          } else {
            const tmpCalleeParam$10 = $(1);
            const tmpClusterSSA_a$5 = $(tmpCalleeParam$10);
            if (tmpClusterSSA_a$5) {
              $(1);
            } else {
              const tmpCalleeParam$12 = $(2);
              a = $(tmpCalleeParam$12);
              if (a) {
                $(1);
              } else {
                break loopStop$3;
              }
            }
          }
          const tmpCalleeParam$11 = $(0);
          const tmpClusterSSA_a$10 = $(tmpCalleeParam$11);
          loopStop$5: {
            if (tmpClusterSSA_a$10) {
              $(1);
            } else {
              const tmpCalleeParam$13 = $(1);
              const tmpClusterSSA_a$7 = $(tmpCalleeParam$13);
              if (tmpClusterSSA_a$7) {
                $(1);
              } else {
                const tmpCalleeParam$15 = $(2);
                a = $(tmpCalleeParam$15);
                if (a) {
                  $(1);
                } else {
                  break loopStop$4;
                }
              }
            }
            const tmpCalleeParam$14 = $(0);
            const tmpClusterSSA_a$12 = $(tmpCalleeParam$14);
            loopStop$6: {
              if (tmpClusterSSA_a$12) {
                $(1);
              } else {
                const tmpCalleeParam$16 = $(1);
                const tmpClusterSSA_a$9 = $(tmpCalleeParam$16);
                if (tmpClusterSSA_a$9) {
                  $(1);
                } else {
                  const tmpCalleeParam$18 = $(2);
                  a = $(tmpCalleeParam$18);
                  if (a) {
                    $(1);
                  } else {
                    break loopStop$5;
                  }
                }
              }
              const tmpCalleeParam$17 = $(0);
              const tmpClusterSSA_a$14 = $(tmpCalleeParam$17);
              loopStop$7: {
                if (tmpClusterSSA_a$14) {
                  $(1);
                } else {
                  const tmpCalleeParam$19 = $(1);
                  const tmpClusterSSA_a$11 = $(tmpCalleeParam$19);
                  if (tmpClusterSSA_a$11) {
                    $(1);
                  } else {
                    const tmpCalleeParam$21 = $(2);
                    a = $(tmpCalleeParam$21);
                    if (a) {
                      $(1);
                    } else {
                      break loopStop$6;
                    }
                  }
                }
                const tmpCalleeParam$20 = $(0);
                const tmpClusterSSA_a$16 = $(tmpCalleeParam$20);
                loopStop$8: {
                  if (tmpClusterSSA_a$16) {
                    $(1);
                  } else {
                    const tmpCalleeParam$22 = $(1);
                    const tmpClusterSSA_a$13 = $(tmpCalleeParam$22);
                    if (tmpClusterSSA_a$13) {
                      $(1);
                    } else {
                      const tmpCalleeParam$24 = $(2);
                      a = $(tmpCalleeParam$24);
                      if (a) {
                        $(1);
                      } else {
                        break loopStop$7;
                      }
                    }
                  }
                  const tmpCalleeParam$23 = $(0);
                  const tmpClusterSSA_a$18 = $(tmpCalleeParam$23);
                  loopStop$9: {
                    if (tmpClusterSSA_a$18) {
                      $(1);
                    } else {
                      const tmpCalleeParam$25 = $(1);
                      const tmpClusterSSA_a$15 = $(tmpCalleeParam$25);
                      if (tmpClusterSSA_a$15) {
                        $(1);
                      } else {
                        const tmpCalleeParam$27 = $(2);
                        a = $(tmpCalleeParam$27);
                        if (a) {
                          $(1);
                        } else {
                          break loopStop$8;
                        }
                      }
                    }
                    const tmpCalleeParam$26 = $(0);
                    const tmpClusterSSA_a$20 = $(tmpCalleeParam$26);
                    loopStop$10: {
                      if (tmpClusterSSA_a$20) {
                        $(1);
                      } else {
                        const tmpCalleeParam$28 = $(1);
                        const tmpClusterSSA_a$17 = $(tmpCalleeParam$28);
                        if (tmpClusterSSA_a$17) {
                          $(1);
                        } else {
                          const tmpCalleeParam$30 = $(2);
                          a = $(tmpCalleeParam$30);
                          if (a) {
                            $(1);
                          } else {
                            break loopStop$9;
                          }
                        }
                      }
                      const tmpCalleeParam$29 = $(0);
                      const tmpClusterSSA_a$22 = $(tmpCalleeParam$29);
                      if (tmpClusterSSA_a$22) {
                        $(1);
                      } else {
                        const tmpCalleeParam$31 = $(1);
                        const tmpClusterSSA_a$19 = $(tmpCalleeParam$31);
                        if (tmpClusterSSA_a$19) {
                          $(1);
                        } else {
                          const tmpCalleeParam$33 = $(2);
                          a = $(tmpCalleeParam$33);
                          if (a) {
                            $(1);
                          } else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpCalleeParam$32 = $(0);
                        a = $(tmpCalleeParam$32);
                        if (a) {
                          $(1);
                        } else {
                          const tmpCalleeParam$34 = $(1);
                          const tmpClusterSSA_a$21 = $(tmpCalleeParam$34);
                          if (tmpClusterSSA_a$21) {
                            $(1);
                          } else {
                            const tmpCalleeParam$36 = $(2);
                            a = $(tmpCalleeParam$36);
                            if (a) {
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
  loopStop$1: {
    if (c) {
      $( 1 );
    }
    else {
      const d = $( 1 );
      const e = $( d );
      if (e) {
        $( 1 );
      }
      else {
        const f = $( 2 );
        a = $( f );
        if (a) {
          $( 1 );
        }
        else {
          break loopStop;
        }
      }
    }
    const g = $( 0 );
    const h = $( g );
    loopStop$2: {
      if (h) {
        $( 1 );
      }
      else {
        const i = $( 1 );
        const j = $( i );
        if (j) {
          $( 1 );
        }
        else {
          const k = $( 2 );
          a = $( k );
          if (a) {
            $( 1 );
          }
          else {
            break loopStop$1;
          }
        }
      }
      const l = $( 0 );
      const m = $( l );
      loopStop$3: {
        if (m) {
          $( 1 );
        }
        else {
          const n = $( 1 );
          const o = $( n );
          if (o) {
            $( 1 );
          }
          else {
            const p = $( 2 );
            a = $( p );
            if (a) {
              $( 1 );
            }
            else {
              break loopStop$2;
            }
          }
        }
        const q = $( 0 );
        const r = $( q );
        loopStop$4: {
          if (r) {
            $( 1 );
          }
          else {
            const s = $( 1 );
            const t = $( s );
            if (t) {
              $( 1 );
            }
            else {
              const u = $( 2 );
              a = $( u );
              if (a) {
                $( 1 );
              }
              else {
                break loopStop$3;
              }
            }
          }
          const v = $( 0 );
          const w = $( v );
          loopStop$5: {
            if (w) {
              $( 1 );
            }
            else {
              const x = $( 1 );
              const y = $( x );
              if (y) {
                $( 1 );
              }
              else {
                const z = $( 2 );
                a = $( z );
                if (a) {
                  $( 1 );
                }
                else {
                  break loopStop$4;
                }
              }
            }
            const 01 = $( 0 );
            const 11 = $( 01 );
            loopStop$6: {
              if (11) {
                $( 1 );
              }
              else {
                const 21 = $( 1 );
                const 31 = $( 21 );
                if (31) {
                  $( 1 );
                }
                else {
                  const 41 = $( 2 );
                  a = $( 41 );
                  if (a) {
                    $( 1 );
                  }
                  else {
                    break loopStop$5;
                  }
                }
              }
              const 51 = $( 0 );
              const 61 = $( 51 );
              loopStop$7: {
                if (61) {
                  $( 1 );
                }
                else {
                  const 71 = $( 1 );
                  const 81 = $( 71 );
                  if (81) {
                    $( 1 );
                  }
                  else {
                    const 91 = $( 2 );
                    a = $( 91 );
                    if (a) {
                      $( 1 );
                    }
                    else {
                      break loopStop$6;
                    }
                  }
                }
                const a1 = $( 0 );
                const b1 = $( a1 );
                loopStop$8: {
                  if (b1) {
                    $( 1 );
                  }
                  else {
                    const c1 = $( 1 );
                    const d1 = $( c1 );
                    if (d1) {
                      $( 1 );
                    }
                    else {
                      const e1 = $( 2 );
                      a = $( e1 );
                      if (a) {
                        $( 1 );
                      }
                      else {
                        break loopStop$7;
                      }
                    }
                  }
                  const f1 = $( 0 );
                  const g1 = $( f1 );
                  loopStop$9: {
                    if (g1) {
                      $( 1 );
                    }
                    else {
                      const h1 = $( 1 );
                      const i1 = $( h1 );
                      if (i1) {
                        $( 1 );
                      }
                      else {
                        const j1 = $( 2 );
                        a = $( j1 );
                        if (a) {
                          $( 1 );
                        }
                        else {
                          break loopStop$8;
                        }
                      }
                    }
                    const k1 = $( 0 );
                    const l1 = $( k1 );
                    loopStop$10: {
                      if (l1) {
                        $( 1 );
                      }
                      else {
                        const m1 = $( 1 );
                        const n1 = $( m1 );
                        if (n1) {
                          $( 1 );
                        }
                        else {
                          const o1 = $( 2 );
                          a = $( o1 );
                          if (a) {
                            $( 1 );
                          }
                          else {
                            break loopStop$9;
                          }
                        }
                      }
                      const p1 = $( 0 );
                      const q1 = $( p1 );
                      if (q1) {
                        $( 1 );
                      }
                      else {
                        const r1 = $( 1 );
                        const s1 = $( r1 );
                        if (s1) {
                          $( 1 );
                        }
                        else {
                          const t1 = $( 2 );
                          a = $( t1 );
                          if (a) {
                            $( 1 );
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
                          $( 1 );
                        }
                        else {
                          const v1 = $( 1 );
                          const w1 = $( v1 );
                          if (w1) {
                            $( 1 );
                          }
                          else {
                            const x1 = $( 2 );
                            a = $( x1 );
                            if (a) {
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
 - 5: 1
 - 6: 0
 - 7: 0
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 0
 - 22: 0
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
