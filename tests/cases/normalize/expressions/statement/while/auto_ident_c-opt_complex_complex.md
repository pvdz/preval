# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ($(b)?.[$("x")]) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ($(b)?.[$(`x`)]) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpIfTest = tmpChainElementObject;
  } else {
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
const b = { x: 1 };
const a = { a: 999, b: 1000 };
loopStop: {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(100);
  } else {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject) {
      $(100);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainRootComputed$1 = $(`x`);
      const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
      if (tmpChainElementObject$1) {
        $(100);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpChainElementCall$2 = $(b);
      const tmpIfTest$3 = tmpChainElementCall$2 == null;
      if (tmpIfTest$3) {
        $(100);
      } else {
        const tmpChainRootComputed$2 = $(`x`);
        const tmpChainElementObject$2 = tmpChainElementCall$2[tmpChainRootComputed$2];
        if (tmpChainElementObject$2) {
          $(100);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpChainElementCall$3 = $(b);
        const tmpIfTest$4 = tmpChainElementCall$3 == null;
        if (tmpIfTest$4) {
          $(100);
        } else {
          const tmpChainRootComputed$3 = $(`x`);
          const tmpChainElementObject$3 = tmpChainElementCall$3[tmpChainRootComputed$3];
          if (tmpChainElementObject$3) {
            $(100);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpChainElementCall$4 = $(b);
          const tmpIfTest$5 = tmpChainElementCall$4 == null;
          if (tmpIfTest$5) {
            $(100);
          } else {
            const tmpChainRootComputed$4 = $(`x`);
            const tmpChainElementObject$4 = tmpChainElementCall$4[tmpChainRootComputed$4];
            if (tmpChainElementObject$4) {
              $(100);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpChainElementCall$5 = $(b);
            const tmpIfTest$6 = tmpChainElementCall$5 == null;
            if (tmpIfTest$6) {
              $(100);
            } else {
              const tmpChainRootComputed$5 = $(`x`);
              const tmpChainElementObject$5 = tmpChainElementCall$5[tmpChainRootComputed$5];
              if (tmpChainElementObject$5) {
                $(100);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpChainElementCall$6 = $(b);
              const tmpIfTest$7 = tmpChainElementCall$6 == null;
              if (tmpIfTest$7) {
                $(100);
              } else {
                const tmpChainRootComputed$6 = $(`x`);
                const tmpChainElementObject$6 = tmpChainElementCall$6[tmpChainRootComputed$6];
                if (tmpChainElementObject$6) {
                  $(100);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpChainElementCall$7 = $(b);
                const tmpIfTest$8 = tmpChainElementCall$7 == null;
                if (tmpIfTest$8) {
                  $(100);
                } else {
                  const tmpChainRootComputed$7 = $(`x`);
                  const tmpChainElementObject$7 = tmpChainElementCall$7[tmpChainRootComputed$7];
                  if (tmpChainElementObject$7) {
                    $(100);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpChainElementCall$8 = $(b);
                  const tmpIfTest$9 = tmpChainElementCall$8 == null;
                  if (tmpIfTest$9) {
                    $(100);
                  } else {
                    const tmpChainRootComputed$8 = $(`x`);
                    const tmpChainElementObject$8 = tmpChainElementCall$8[tmpChainRootComputed$8];
                    if (tmpChainElementObject$8) {
                      $(100);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpChainElementCall$9 = $(b);
                    const tmpIfTest$10 = tmpChainElementCall$9 == null;
                    if (tmpIfTest$10) {
                      $(100);
                    } else {
                      const tmpChainRootComputed$9 = $(`x`);
                      const tmpChainElementObject$9 = tmpChainElementCall$9[tmpChainRootComputed$9];
                      if (tmpChainElementObject$9) {
                        $(100);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpChainElementCall$10 = $(b);
                      const tmpIfTest$11 = tmpChainElementCall$10 == null;
                      if (tmpIfTest$11) {
                        $(100);
                      } else {
                        const tmpChainRootComputed$10 = $(`x`);
                        const tmpChainElementObject$10 = tmpChainElementCall$10[tmpChainRootComputed$10];
                        if (tmpChainElementObject$10) {
                          $(100);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpChainElementCall$11 = $(b);
                        const tmpIfTest$12 = tmpChainElementCall$11 == null;
                        if (tmpIfTest$12) {
                          $(100);
                        } else {
                          const tmpChainRootComputed$11 = $(`x`);
                          const tmpChainElementObject$11 = tmpChainElementCall$11[tmpChainRootComputed$11];
                          if (tmpChainElementObject$11) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
  a: 999,
  b: 1000,
};
loopStop: {
  const c = $( a );
  const d = c == null;
  if (d) {
    $( 100 );
  }
  else {
    const e = $( "x" );
    const f = c[ e ];
    if (f) {
      $( 100 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const g = $( a );
    const h = g == null;
    if (h) {
      $( 100 );
    }
    else {
      const i = $( "x" );
      const j = g[ i ];
      if (j) {
        $( 100 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const k = $( a );
      const l = k == null;
      if (l) {
        $( 100 );
      }
      else {
        const m = $( "x" );
        const n = k[ m ];
        if (n) {
          $( 100 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const o = $( a );
        const p = o == null;
        if (p) {
          $( 100 );
        }
        else {
          const q = $( "x" );
          const r = o[ q ];
          if (r) {
            $( 100 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const s = $( a );
          const t = s == null;
          if (t) {
            $( 100 );
          }
          else {
            const u = $( "x" );
            const v = s[ u ];
            if (v) {
              $( 100 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const w = $( a );
            const x = w == null;
            if (x) {
              $( 100 );
            }
            else {
              const y = $( "x" );
              const z = w[ y ];
              if (z) {
                $( 100 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const 01 = $( a );
              const 11 = 01 == null;
              if (11) {
                $( 100 );
              }
              else {
                const 21 = $( "x" );
                const 31 = 01[ 21 ];
                if (31) {
                  $( 100 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const 41 = $( a );
                const 51 = 41 == null;
                if (51) {
                  $( 100 );
                }
                else {
                  const 61 = $( "x" );
                  const 71 = 41[ 61 ];
                  if (71) {
                    $( 100 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const 81 = $( a );
                  const 91 = 81 == null;
                  if (91) {
                    $( 100 );
                  }
                  else {
                    const a1 = $( "x" );
                    const b1 = 81[ a1 ];
                    if (b1) {
                      $( 100 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const c1 = $( a );
                    const d1 = c1 == null;
                    if (d1) {
                      $( 100 );
                    }
                    else {
                      const e1 = $( "x" );
                      const f1 = c1[ e1 ];
                      if (f1) {
                        $( 100 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const g1 = $( a );
                      const h1 = g1 == null;
                      if (h1) {
                        $( 100 );
                      }
                      else {
                        const i1 = $( "x" );
                        const j1 = g1[ i1 ];
                        if (j1) {
                          $( 100 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const k1 = $( a );
                        const l1 = k1 == null;
                        if (l1) {
                          $( 100 );
                        }
                        else {
                          const m1 = $( "x" );
                          const n1 = k1[ m1 ];
                          if (n1) {
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
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 100
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 100
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 100
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 100
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 100
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 100
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 100
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 100
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
