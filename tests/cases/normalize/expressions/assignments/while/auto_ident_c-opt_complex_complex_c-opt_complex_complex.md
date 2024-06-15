# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$("x")]?.[$("y")])) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$(`x`)]?.[$(`y`)])) $(100);
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
    } else {
    }
  } else {
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
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let a = undefined;
loopStop: {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject == null;
    if (tmpIfTest$3) {
      $(100);
    } else {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      a = tmpChainElementObject$1;
      if (tmpChainElementObject$1) {
        $(100);
      } else {
        break loopStop;
      }
    }
  }
  loopStop$1: {
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainRootComputed$2 = $(`x`);
      const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
      const tmpIfTest$4 = tmpChainElementObject$2 == null;
      if (tmpIfTest$4) {
        $(100);
      } else {
        const tmpChainRootComputed$4 = $(`y`);
        const tmpChainElementObject$4 = tmpChainElementObject$2[tmpChainRootComputed$4];
        a = tmpChainElementObject$4;
        if (tmpChainElementObject$4) {
          $(100);
        } else {
          break loopStop$1;
        }
      }
    }
    loopStop$2: {
      const tmpChainElementCall$2 = $(b);
      const tmpIfTest$5 = tmpChainElementCall$2 == null;
      if (tmpIfTest$5) {
        $(100);
      } else {
        const tmpChainRootComputed$3 = $(`x`);
        const tmpChainElementObject$3 = tmpChainElementCall$2[tmpChainRootComputed$3];
        const tmpIfTest$7 = tmpChainElementObject$3 == null;
        if (tmpIfTest$7) {
          $(100);
        } else {
          const tmpChainRootComputed$5 = $(`y`);
          const tmpChainElementObject$5 = tmpChainElementObject$3[tmpChainRootComputed$5];
          a = tmpChainElementObject$5;
          if (tmpChainElementObject$5) {
            $(100);
          } else {
            break loopStop$2;
          }
        }
      }
      loopStop$3: {
        const tmpChainElementCall$3 = $(b);
        const tmpIfTest$6 = tmpChainElementCall$3 == null;
        if (tmpIfTest$6) {
          $(100);
        } else {
          const tmpChainRootComputed$6 = $(`x`);
          const tmpChainElementObject$6 = tmpChainElementCall$3[tmpChainRootComputed$6];
          const tmpIfTest$8 = tmpChainElementObject$6 == null;
          if (tmpIfTest$8) {
            $(100);
          } else {
            const tmpChainRootComputed$8 = $(`y`);
            const tmpChainElementObject$8 = tmpChainElementObject$6[tmpChainRootComputed$8];
            a = tmpChainElementObject$8;
            if (tmpChainElementObject$8) {
              $(100);
            } else {
              break loopStop$3;
            }
          }
        }
        loopStop$4: {
          const tmpChainElementCall$4 = $(b);
          const tmpIfTest$9 = tmpChainElementCall$4 == null;
          if (tmpIfTest$9) {
            $(100);
          } else {
            const tmpChainRootComputed$7 = $(`x`);
            const tmpChainElementObject$7 = tmpChainElementCall$4[tmpChainRootComputed$7];
            const tmpIfTest$11 = tmpChainElementObject$7 == null;
            if (tmpIfTest$11) {
              $(100);
            } else {
              const tmpChainRootComputed$9 = $(`y`);
              const tmpChainElementObject$9 = tmpChainElementObject$7[tmpChainRootComputed$9];
              a = tmpChainElementObject$9;
              if (tmpChainElementObject$9) {
                $(100);
              } else {
                break loopStop$4;
              }
            }
          }
          loopStop$5: {
            const tmpChainElementCall$5 = $(b);
            const tmpIfTest$10 = tmpChainElementCall$5 == null;
            if (tmpIfTest$10) {
              $(100);
            } else {
              const tmpChainRootComputed$10 = $(`x`);
              const tmpChainElementObject$10 = tmpChainElementCall$5[tmpChainRootComputed$10];
              const tmpIfTest$12 = tmpChainElementObject$10 == null;
              if (tmpIfTest$12) {
                $(100);
              } else {
                const tmpChainRootComputed$12 = $(`y`);
                const tmpChainElementObject$12 = tmpChainElementObject$10[tmpChainRootComputed$12];
                a = tmpChainElementObject$12;
                if (tmpChainElementObject$12) {
                  $(100);
                } else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6: {
              const tmpChainElementCall$6 = $(b);
              const tmpIfTest$13 = tmpChainElementCall$6 == null;
              if (tmpIfTest$13) {
                $(100);
              } else {
                const tmpChainRootComputed$11 = $(`x`);
                const tmpChainElementObject$11 = tmpChainElementCall$6[tmpChainRootComputed$11];
                const tmpIfTest$15 = tmpChainElementObject$11 == null;
                if (tmpIfTest$15) {
                  $(100);
                } else {
                  const tmpChainRootComputed$13 = $(`y`);
                  const tmpChainElementObject$13 = tmpChainElementObject$11[tmpChainRootComputed$13];
                  a = tmpChainElementObject$13;
                  if (tmpChainElementObject$13) {
                    $(100);
                  } else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7: {
                const tmpChainElementCall$7 = $(b);
                const tmpIfTest$14 = tmpChainElementCall$7 == null;
                if (tmpIfTest$14) {
                  $(100);
                } else {
                  const tmpChainRootComputed$14 = $(`x`);
                  const tmpChainElementObject$14 = tmpChainElementCall$7[tmpChainRootComputed$14];
                  const tmpIfTest$16 = tmpChainElementObject$14 == null;
                  if (tmpIfTest$16) {
                    $(100);
                  } else {
                    const tmpChainRootComputed$16 = $(`y`);
                    const tmpChainElementObject$16 = tmpChainElementObject$14[tmpChainRootComputed$16];
                    a = tmpChainElementObject$16;
                    if (tmpChainElementObject$16) {
                      $(100);
                    } else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$8 = $(b);
                  const tmpIfTest$17 = tmpChainElementCall$8 == null;
                  if (tmpIfTest$17) {
                    $(100);
                  } else {
                    const tmpChainRootComputed$15 = $(`x`);
                    const tmpChainElementObject$15 = tmpChainElementCall$8[tmpChainRootComputed$15];
                    const tmpIfTest$19 = tmpChainElementObject$15 == null;
                    if (tmpIfTest$19) {
                      $(100);
                    } else {
                      const tmpChainRootComputed$17 = $(`y`);
                      const tmpChainElementObject$17 = tmpChainElementObject$15[tmpChainRootComputed$17];
                      a = tmpChainElementObject$17;
                      if (tmpChainElementObject$17) {
                        $(100);
                      } else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$9 = $(b);
                    const tmpIfTest$18 = tmpChainElementCall$9 == null;
                    if (tmpIfTest$18) {
                      $(100);
                    } else {
                      const tmpChainRootComputed$18 = $(`x`);
                      const tmpChainElementObject$18 = tmpChainElementCall$9[tmpChainRootComputed$18];
                      const tmpIfTest$20 = tmpChainElementObject$18 == null;
                      if (tmpIfTest$20) {
                        $(100);
                      } else {
                        const tmpChainRootComputed$20 = $(`y`);
                        const tmpChainElementObject$20 = tmpChainElementObject$18[tmpChainRootComputed$20];
                        a = tmpChainElementObject$20;
                        if (tmpChainElementObject$20) {
                          $(100);
                        } else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$10 = $(b);
                      const tmpIfTest$21 = tmpChainElementCall$10 == null;
                      if (tmpIfTest$21) {
                        $(100);
                      } else {
                        const tmpChainRootComputed$19 = $(`x`);
                        const tmpChainElementObject$19 = tmpChainElementCall$10[tmpChainRootComputed$19];
                        const tmpIfTest$23 = tmpChainElementObject$19 == null;
                        if (tmpIfTest$23) {
                          $(100);
                        } else {
                          const tmpChainRootComputed$21 = $(`y`);
                          const tmpChainElementObject$21 = tmpChainElementObject$19[tmpChainRootComputed$21];
                          a = tmpChainElementObject$21;
                          if (tmpChainElementObject$21) {
                            $(100);
                          } else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$11 = $(b);
                        const tmpIfTest$22 = tmpChainElementCall$11 == null;
                        if (tmpIfTest$22) {
                          $(100);
                        } else {
                          const tmpChainRootComputed$22 = $(`x`);
                          const tmpChainElementObject$22 = tmpChainElementCall$11[tmpChainRootComputed$22];
                          const tmpIfTest$24 = tmpChainElementObject$22 == null;
                          if (tmpIfTest$24) {
                            $(100);
                          } else {
                            const tmpChainRootComputed$24 = $(`y`);
                            const tmpChainElementObject$24 = tmpChainElementObject$22[tmpChainRootComputed$24];
                            a = tmpChainElementObject$24;
                            if (tmpChainElementObject$24) {
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
const a = { y: 1 };
const b = { x: a };
let c = undefined;
loopStop: {
  const d = $( b );
  const e = d == null;
  if (e) {
    $( 100 );
  }
  else {
    const f = $( "x" );
    const g = d[ f ];
    const h = g == null;
    if (h) {
      $( 100 );
    }
    else {
      const i = $( "y" );
      const j = g[ i ];
      c = j;
      if (j) {
        $( 100 );
      }
      else {
        break loopStop;
      }
    }
  }
  loopStop$1:   {
    const k = $( b );
    const l = k == null;
    if (l) {
      $( 100 );
    }
    else {
      const m = $( "x" );
      const n = k[ m ];
      const o = n == null;
      if (o) {
        $( 100 );
      }
      else {
        const p = $( "y" );
        const q = n[ p ];
        c = q;
        if (q) {
          $( 100 );
        }
        else {
          break loopStop$1;
        }
      }
    }
    loopStop$2:     {
      const r = $( b );
      const s = r == null;
      if (s) {
        $( 100 );
      }
      else {
        const t = $( "x" );
        const u = r[ t ];
        const v = u == null;
        if (v) {
          $( 100 );
        }
        else {
          const w = $( "y" );
          const x = u[ w ];
          c = x;
          if (x) {
            $( 100 );
          }
          else {
            break loopStop$2;
          }
        }
      }
      loopStop$3:       {
        const y = $( b );
        const z = y == null;
        if (z) {
          $( 100 );
        }
        else {
          const 01 = $( "x" );
          const 11 = y[ 01 ];
          const 21 = 11 == null;
          if (21) {
            $( 100 );
          }
          else {
            const 31 = $( "y" );
            const 41 = 11[ 31 ];
            c = 41;
            if (41) {
              $( 100 );
            }
            else {
              break loopStop$3;
            }
          }
        }
        loopStop$4:         {
          const 51 = $( b );
          const 61 = 51 == null;
          if (61) {
            $( 100 );
          }
          else {
            const 71 = $( "x" );
            const 81 = 51[ 71 ];
            const 91 = 81 == null;
            if (91) {
              $( 100 );
            }
            else {
              const a1 = $( "y" );
              const b1 = 81[ a1 ];
              c = b1;
              if (b1) {
                $( 100 );
              }
              else {
                break loopStop$4;
              }
            }
          }
          loopStop$5:           {
            const c1 = $( b );
            const d1 = c1 == null;
            if (d1) {
              $( 100 );
            }
            else {
              const e1 = $( "x" );
              const f1 = c1[ e1 ];
              const g1 = f1 == null;
              if (g1) {
                $( 100 );
              }
              else {
                const h1 = $( "y" );
                const i1 = f1[ h1 ];
                c = i1;
                if (i1) {
                  $( 100 );
                }
                else {
                  break loopStop$5;
                }
              }
            }
            loopStop$6:             {
              const j1 = $( b );
              const k1 = j1 == null;
              if (k1) {
                $( 100 );
              }
              else {
                const l1 = $( "x" );
                const m1 = j1[ l1 ];
                const n1 = m1 == null;
                if (n1) {
                  $( 100 );
                }
                else {
                  const o1 = $( "y" );
                  const p1 = m1[ o1 ];
                  c = p1;
                  if (p1) {
                    $( 100 );
                  }
                  else {
                    break loopStop$6;
                  }
                }
              }
              loopStop$7:               {
                const q1 = $( b );
                const r1 = q1 == null;
                if (r1) {
                  $( 100 );
                }
                else {
                  const s1 = $( "x" );
                  const t1 = q1[ s1 ];
                  const u1 = t1 == null;
                  if (u1) {
                    $( 100 );
                  }
                  else {
                    const v1 = $( "y" );
                    const w1 = t1[ v1 ];
                    c = w1;
                    if (w1) {
                      $( 100 );
                    }
                    else {
                      break loopStop$7;
                    }
                  }
                }
                loopStop$8:                 {
                  const x1 = $( b );
                  const y1 = x1 == null;
                  if (y1) {
                    $( 100 );
                  }
                  else {
                    const z1 = $( "x" );
                    const 02 = x1[ z1 ];
                    const 12 = 02 == null;
                    if (12) {
                      $( 100 );
                    }
                    else {
                      const 22 = $( "y" );
                      const 32 = 02[ 22 ];
                      c = 32;
                      if (32) {
                        $( 100 );
                      }
                      else {
                        break loopStop$8;
                      }
                    }
                  }
                  loopStop$9:                   {
                    const 42 = $( b );
                    const 52 = 42 == null;
                    if (52) {
                      $( 100 );
                    }
                    else {
                      const 62 = $( "x" );
                      const 72 = 42[ 62 ];
                      const 82 = 72 == null;
                      if (82) {
                        $( 100 );
                      }
                      else {
                        const 92 = $( "y" );
                        const a2 = 72[ 92 ];
                        c = a2;
                        if (a2) {
                          $( 100 );
                        }
                        else {
                          break loopStop$9;
                        }
                      }
                    }
                    loopStop$10:                     {
                      const b2 = $( b );
                      const c2 = b2 == null;
                      if (c2) {
                        $( 100 );
                      }
                      else {
                        const d2 = $( "x" );
                        const e2 = b2[ d2 ];
                        const f2 = e2 == null;
                        if (f2) {
                          $( 100 );
                        }
                        else {
                          const g2 = $( "y" );
                          const h2 = e2[ g2 ];
                          c = h2;
                          if (h2) {
                            $( 100 );
                          }
                          else {
                            break loopStop$10;
                          }
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const i2 = $( b );
                        const j2 = i2 == null;
                        if (j2) {
                          $( 100 );
                        }
                        else {
                          const k2 = $( "x" );
                          const l2 = i2[ k2 ];
                          const m2 = l2 == null;
                          if (m2) {
                            $( 100 );
                          }
                          else {
                            const n2 = $( "y" );
                            const o2 = l2[ n2 ];
                            c = o2;
                            if (o2) {
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
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 100
 - 5: { x: '{"y":"1"}' }
 - 6: 'x'
 - 7: 'y'
 - 8: 100
 - 9: { x: '{"y":"1"}' }
 - 10: 'x'
 - 11: 'y'
 - 12: 100
 - 13: { x: '{"y":"1"}' }
 - 14: 'x'
 - 15: 'y'
 - 16: 100
 - 17: { x: '{"y":"1"}' }
 - 18: 'x'
 - 19: 'y'
 - 20: 100
 - 21: { x: '{"y":"1"}' }
 - 22: 'x'
 - 23: 'y'
 - 24: 100
 - 25: { x: '{"y":"1"}' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
