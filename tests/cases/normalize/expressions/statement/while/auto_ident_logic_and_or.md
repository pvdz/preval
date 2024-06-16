# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > While > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (($($(1)) && $($(1))) || $($(2))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (($($(1)) && $($(1))) || $($(2))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
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
  const tmpCalleeParam = $(1);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest) {
    $(100);
  } else {
    const tmpCalleeParam$3 = $(2);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpCalleeParam$2 = $(1);
    let tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
      const tmpCalleeParam$4 = $(1);
      tmpIfTest$1 = $(tmpCalleeParam$4);
    } else {
    }
    if (tmpIfTest$1) {
      $(100);
    } else {
      const tmpCalleeParam$6 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$6);
      if (tmpClusterSSA_tmpIfTest$1) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpCalleeParam$5 = $(1);
      let tmpIfTest$2 = $(tmpCalleeParam$5);
      if (tmpIfTest$2) {
        const tmpCalleeParam$7 = $(1);
        tmpIfTest$2 = $(tmpCalleeParam$7);
      } else {
      }
      if (tmpIfTest$2) {
        $(100);
      } else {
        const tmpCalleeParam$9 = $(2);
        const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$9);
        if (tmpClusterSSA_tmpIfTest$2) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpCalleeParam$8 = $(1);
        let tmpIfTest$3 = $(tmpCalleeParam$8);
        if (tmpIfTest$3) {
          const tmpCalleeParam$10 = $(1);
          tmpIfTest$3 = $(tmpCalleeParam$10);
        } else {
        }
        if (tmpIfTest$3) {
          $(100);
        } else {
          const tmpCalleeParam$12 = $(2);
          const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$12);
          if (tmpClusterSSA_tmpIfTest$3) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpCalleeParam$11 = $(1);
          let tmpIfTest$4 = $(tmpCalleeParam$11);
          if (tmpIfTest$4) {
            const tmpCalleeParam$13 = $(1);
            tmpIfTest$4 = $(tmpCalleeParam$13);
          } else {
          }
          if (tmpIfTest$4) {
            $(100);
          } else {
            const tmpCalleeParam$15 = $(2);
            const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$15);
            if (tmpClusterSSA_tmpIfTest$4) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpCalleeParam$14 = $(1);
            let tmpIfTest$5 = $(tmpCalleeParam$14);
            if (tmpIfTest$5) {
              const tmpCalleeParam$16 = $(1);
              tmpIfTest$5 = $(tmpCalleeParam$16);
            } else {
            }
            if (tmpIfTest$5) {
              $(100);
            } else {
              const tmpCalleeParam$18 = $(2);
              const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$18);
              if (tmpClusterSSA_tmpIfTest$5) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpCalleeParam$17 = $(1);
              let tmpIfTest$6 = $(tmpCalleeParam$17);
              if (tmpIfTest$6) {
                const tmpCalleeParam$19 = $(1);
                tmpIfTest$6 = $(tmpCalleeParam$19);
              } else {
              }
              if (tmpIfTest$6) {
                $(100);
              } else {
                const tmpCalleeParam$21 = $(2);
                const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$21);
                if (tmpClusterSSA_tmpIfTest$6) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpCalleeParam$20 = $(1);
                let tmpIfTest$7 = $(tmpCalleeParam$20);
                if (tmpIfTest$7) {
                  const tmpCalleeParam$22 = $(1);
                  tmpIfTest$7 = $(tmpCalleeParam$22);
                } else {
                }
                if (tmpIfTest$7) {
                  $(100);
                } else {
                  const tmpCalleeParam$24 = $(2);
                  const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$24);
                  if (tmpClusterSSA_tmpIfTest$7) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpCalleeParam$23 = $(1);
                  let tmpIfTest$8 = $(tmpCalleeParam$23);
                  if (tmpIfTest$8) {
                    const tmpCalleeParam$25 = $(1);
                    tmpIfTest$8 = $(tmpCalleeParam$25);
                  } else {
                  }
                  if (tmpIfTest$8) {
                    $(100);
                  } else {
                    const tmpCalleeParam$27 = $(2);
                    const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$27);
                    if (tmpClusterSSA_tmpIfTest$8) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpCalleeParam$26 = $(1);
                    let tmpIfTest$9 = $(tmpCalleeParam$26);
                    if (tmpIfTest$9) {
                      const tmpCalleeParam$28 = $(1);
                      tmpIfTest$9 = $(tmpCalleeParam$28);
                    } else {
                    }
                    if (tmpIfTest$9) {
                      $(100);
                    } else {
                      const tmpCalleeParam$30 = $(2);
                      const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$30);
                      if (tmpClusterSSA_tmpIfTest$9) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpCalleeParam$29 = $(1);
                      let tmpIfTest$10 = $(tmpCalleeParam$29);
                      if (tmpIfTest$10) {
                        const tmpCalleeParam$31 = $(1);
                        tmpIfTest$10 = $(tmpCalleeParam$31);
                      } else {
                      }
                      if (tmpIfTest$10) {
                        $(100);
                      } else {
                        const tmpCalleeParam$33 = $(2);
                        const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$33);
                        if (tmpClusterSSA_tmpIfTest$10) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpCalleeParam$32 = $(1);
                        let tmpIfTest$11 = $(tmpCalleeParam$32);
                        if (tmpIfTest$11) {
                          const tmpCalleeParam$34 = $(1);
                          tmpIfTest$11 = $(tmpCalleeParam$34);
                        } else {
                        }
                        if (tmpIfTest$11) {
                          $(100);
                        } else {
                          const tmpCalleeParam$36 = $(2);
                          const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$36);
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
  let b = $( a );
  if (b) {
    const c = $( 1 );
    b = $( c );
  }
  if (b) {
    $( 100 );
  }
  else {
    const d = $( 2 );
    const e = $( d );
    if (e) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const f = $( 1 );
    let g = $( f );
    if (g) {
      const h = $( 1 );
      g = $( h );
    }
    if (g) {
      $( 100 );
    }
    else {
      const i = $( 2 );
      const j = $( i );
      if (j) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const k = $( 1 );
      let l = $( k );
      if (l) {
        const m = $( 1 );
        l = $( m );
      }
      if (l) {
        $( 100 );
      }
      else {
        const n = $( 2 );
        const o = $( n );
        if (o) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const p = $( 1 );
        let q = $( p );
        if (q) {
          const r = $( 1 );
          q = $( r );
        }
        if (q) {
          $( 100 );
        }
        else {
          const s = $( 2 );
          const t = $( s );
          if (t) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const u = $( 1 );
          let v = $( u );
          if (v) {
            const w = $( 1 );
            v = $( w );
          }
          if (v) {
            $( 100 );
          }
          else {
            const x = $( 2 );
            const y = $( x );
            if (y) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const z = $( 1 );
            let 01 = $( z );
            if (01) {
              const 11 = $( 1 );
              01 = $( 11 );
            }
            if (01) {
              $( 100 );
            }
            else {
              const 21 = $( 2 );
              const 31 = $( 21 );
              if (31) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const 41 = $( 1 );
              let 51 = $( 41 );
              if (51) {
                const 61 = $( 1 );
                51 = $( 61 );
              }
              if (51) {
                $( 100 );
              }
              else {
                const 71 = $( 2 );
                const 81 = $( 71 );
                if (81) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const 91 = $( 1 );
                let a1 = $( 91 );
                if (a1) {
                  const b1 = $( 1 );
                  a1 = $( b1 );
                }
                if (a1) {
                  $( 100 );
                }
                else {
                  const c1 = $( 2 );
                  const d1 = $( c1 );
                  if (d1) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const e1 = $( 1 );
                  let f1 = $( e1 );
                  if (f1) {
                    const g1 = $( 1 );
                    f1 = $( g1 );
                  }
                  if (f1) {
                    $( 100 );
                  }
                  else {
                    const h1 = $( 2 );
                    const i1 = $( h1 );
                    if (i1) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const j1 = $( 1 );
                    let k1 = $( j1 );
                    if (k1) {
                      const l1 = $( 1 );
                      k1 = $( l1 );
                    }
                    if (k1) {
                      $( 100 );
                    }
                    else {
                      const m1 = $( 2 );
                      const n1 = $( m1 );
                      if (n1) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const o1 = $( 1 );
                      let p1 = $( o1 );
                      if (p1) {
                        const q1 = $( 1 );
                        p1 = $( q1 );
                      }
                      if (p1) {
                        $( 100 );
                      }
                      else {
                        const r1 = $( 2 );
                        const s1 = $( r1 );
                        if (s1) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const t1 = $( 1 );
                        let u1 = $( t1 );
                        if (u1) {
                          const v1 = $( 1 );
                          u1 = $( v1 );
                        }
                        if (u1) {
                          $( 100 );
                        }
                        else {
                          const w1 = $( 2 );
                          const x1 = $( w1 );
                          if (x1) {
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
const y1 = {
  a: 999,
  b: 1000,
};
$( y1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
