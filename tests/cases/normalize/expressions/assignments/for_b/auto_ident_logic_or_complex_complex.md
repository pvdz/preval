# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || $($(2))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($(0)) || $($(2)))) {
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
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
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
  if (tmpClusterSSA_a) {
    $(1);
  } else {
    const tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpCalleeParam$2 = $(0);
    const tmpClusterSSA_a$1 = $(tmpCalleeParam$2);
    if (tmpClusterSSA_a$1) {
      $(1);
    } else {
      const tmpCalleeParam$4 = $(2);
      a = $(tmpCalleeParam$4);
      if (a) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpCalleeParam$3 = $(0);
      const tmpClusterSSA_a$2 = $(tmpCalleeParam$3);
      if (tmpClusterSSA_a$2) {
        $(1);
      } else {
        const tmpCalleeParam$5 = $(2);
        a = $(tmpCalleeParam$5);
        if (a) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpCalleeParam$6 = $(0);
        const tmpClusterSSA_a$3 = $(tmpCalleeParam$6);
        if (tmpClusterSSA_a$3) {
          $(1);
        } else {
          const tmpCalleeParam$8 = $(2);
          a = $(tmpCalleeParam$8);
          if (a) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpCalleeParam$7 = $(0);
          const tmpClusterSSA_a$4 = $(tmpCalleeParam$7);
          if (tmpClusterSSA_a$4) {
            $(1);
          } else {
            const tmpCalleeParam$9 = $(2);
            a = $(tmpCalleeParam$9);
            if (a) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpCalleeParam$10 = $(0);
            const tmpClusterSSA_a$5 = $(tmpCalleeParam$10);
            if (tmpClusterSSA_a$5) {
              $(1);
            } else {
              const tmpCalleeParam$12 = $(2);
              a = $(tmpCalleeParam$12);
              if (a) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpCalleeParam$11 = $(0);
              const tmpClusterSSA_a$6 = $(tmpCalleeParam$11);
              if (tmpClusterSSA_a$6) {
                $(1);
              } else {
                const tmpCalleeParam$13 = $(2);
                a = $(tmpCalleeParam$13);
                if (a) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpCalleeParam$14 = $(0);
                const tmpClusterSSA_a$7 = $(tmpCalleeParam$14);
                if (tmpClusterSSA_a$7) {
                  $(1);
                } else {
                  const tmpCalleeParam$16 = $(2);
                  a = $(tmpCalleeParam$16);
                  if (a) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpCalleeParam$15 = $(0);
                  const tmpClusterSSA_a$8 = $(tmpCalleeParam$15);
                  if (tmpClusterSSA_a$8) {
                    $(1);
                  } else {
                    const tmpCalleeParam$17 = $(2);
                    a = $(tmpCalleeParam$17);
                    if (a) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpCalleeParam$18 = $(0);
                    const tmpClusterSSA_a$9 = $(tmpCalleeParam$18);
                    if (tmpClusterSSA_a$9) {
                      $(1);
                    } else {
                      const tmpCalleeParam$20 = $(2);
                      a = $(tmpCalleeParam$20);
                      if (a) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpCalleeParam$19 = $(0);
                      const tmpClusterSSA_a$10 = $(tmpCalleeParam$19);
                      if (tmpClusterSSA_a$10) {
                        $(1);
                      } else {
                        const tmpCalleeParam$21 = $(2);
                        a = $(tmpCalleeParam$21);
                        if (a) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpCalleeParam$22 = $(0);
                        a = $(tmpCalleeParam$22);
                        if (a) {
                          $(1);
                        } else {
                          const tmpCalleeParam$24 = $(2);
                          a = $(tmpCalleeParam$24);
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
    $( 1 );
  }
  else {
    const d = $( 2 );
    a = $( d );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const e = $( 0 );
    const f = $( e );
    if (f) {
      $( 1 );
    }
    else {
      const g = $( 2 );
      a = $( g );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const h = $( 0 );
      const i = $( h );
      if (i) {
        $( 1 );
      }
      else {
        const j = $( 2 );
        a = $( j );
        if (a) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const k = $( 0 );
        const l = $( k );
        if (l) {
          $( 1 );
        }
        else {
          const m = $( 2 );
          a = $( m );
          if (a) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const n = $( 0 );
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
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const q = $( 0 );
            const r = $( q );
            if (r) {
              $( 1 );
            }
            else {
              const s = $( 2 );
              a = $( s );
              if (a) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const t = $( 0 );
              const u = $( t );
              if (u) {
                $( 1 );
              }
              else {
                const v = $( 2 );
                a = $( v );
                if (a) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const w = $( 0 );
                const x = $( w );
                if (x) {
                  $( 1 );
                }
                else {
                  const y = $( 2 );
                  a = $( y );
                  if (a) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const z = $( 0 );
                  const 01 = $( z );
                  if (01) {
                    $( 1 );
                  }
                  else {
                    const 11 = $( 2 );
                    a = $( 11 );
                    if (a) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const 21 = $( 0 );
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
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const 51 = $( 0 );
                      const 61 = $( 51 );
                      if (61) {
                        $( 1 );
                      }
                      else {
                        const 71 = $( 2 );
                        a = $( 71 );
                        if (a) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const 81 = $( 0 );
                        a = $( 81 );
                        if (a) {
                          $( 1 );
                        }
                        else {
                          const 91 = $( 2 );
                          a = $( 91 );
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
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 0
 - 7: 0
 - 8: 2
 - 9: 2
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 2
 - 14: 2
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 2
 - 19: 2
 - 20: 1
 - 21: 0
 - 22: 0
 - 23: 2
 - 24: 2
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
