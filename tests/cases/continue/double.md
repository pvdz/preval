# Preval test case

# double.md

> Continue > Double
>
> Simple example

#TODO

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  if ($(false)) {
    $('neither');
    continue;
  }
  $('exit');
  break;
}
$('woohoo');

while (true) {
  let continued = false;
  if ($(false)) {
    $('uhoh');
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(false)) {
      $('neither');
    } else {
      continued = true;
    }
  }
  if (!continued) {
    $('exit');
    break;
  }
}
$('woohoo');
`````

## Pre Normal


`````js filename=intro
while (true) {
  $continue: {
    {
      if ($(false)) {
        $(`uhoh`);
        break $continue;
      }
      if ($(false)) {
        $(`neither`);
        break $continue;
      }
      $(`exit`);
      break;
    }
  }
}
$(`woohoo`);
while (true) {
  let continued = false;
  if ($(false)) {
    $(`uhoh`);
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(false)) {
      $(`neither`);
    } else {
      continued = true;
    }
  }
  if (!continued) {
    $(`exit`);
    break;
  }
}
$(`woohoo`);
`````

## Normalized


`````js filename=intro
while (true) {
  $continue: {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      $(`uhoh`);
      break $continue;
    } else {
      const tmpIfTest$1 = $(false);
      if (tmpIfTest$1) {
        $(`neither`);
        break $continue;
      } else {
        $(`exit`);
        break;
      }
    }
  }
}
$(`woohoo`);
while (true) {
  let continued = false;
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    $(`uhoh`);
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$5 = $(false);
    if (tmpIfTest$5) {
      $(`neither`);
    } else {
      continued = true;
    }
    if (continued) {
    } else {
      $(`exit`);
      break;
    }
  }
}
$(`woohoo`);
`````

## Output


`````js filename=intro
loopStop$1: {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    $(`uhoh`);
  } else {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      $(`neither`);
    } else {
      $(`exit`);
      break loopStop$1;
    }
  }
  loopStop$2: {
    const tmpIfTest$2 = $(false);
    if (tmpIfTest$2) {
      $(`uhoh`);
    } else {
      const tmpIfTest$4 = $(false);
      if (tmpIfTest$4) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop$2;
      }
    }
    loopStop$3: {
      const tmpIfTest$3 = $(false);
      if (tmpIfTest$3) {
        $(`uhoh`);
      } else {
        const tmpIfTest$5 = $(false);
        if (tmpIfTest$5) {
          $(`neither`);
        } else {
          $(`exit`);
          break loopStop$3;
        }
      }
      loopStop$4: {
        const tmpIfTest$6 = $(false);
        if (tmpIfTest$6) {
          $(`uhoh`);
        } else {
          const tmpIfTest$8 = $(false);
          if (tmpIfTest$8) {
            $(`neither`);
          } else {
            $(`exit`);
            break loopStop$4;
          }
        }
        loopStop$5: {
          const tmpIfTest$7 = $(false);
          if (tmpIfTest$7) {
            $(`uhoh`);
          } else {
            const tmpIfTest$9 = $(false);
            if (tmpIfTest$9) {
              $(`neither`);
            } else {
              $(`exit`);
              break loopStop$5;
            }
          }
          loopStop$6: {
            const tmpIfTest$10 = $(false);
            if (tmpIfTest$10) {
              $(`uhoh`);
            } else {
              const tmpIfTest$12 = $(false);
              if (tmpIfTest$12) {
                $(`neither`);
              } else {
                $(`exit`);
                break loopStop$6;
              }
            }
            loopStop$7: {
              const tmpIfTest$11 = $(false);
              if (tmpIfTest$11) {
                $(`uhoh`);
              } else {
                const tmpIfTest$13 = $(false);
                if (tmpIfTest$13) {
                  $(`neither`);
                } else {
                  $(`exit`);
                  break loopStop$7;
                }
              }
              loopStop$8: {
                const tmpIfTest$14 = $(false);
                if (tmpIfTest$14) {
                  $(`uhoh`);
                } else {
                  const tmpIfTest$16 = $(false);
                  if (tmpIfTest$16) {
                    $(`neither`);
                  } else {
                    $(`exit`);
                    break loopStop$8;
                  }
                }
                loopStop$9: {
                  const tmpIfTest$15 = $(false);
                  if (tmpIfTest$15) {
                    $(`uhoh`);
                  } else {
                    const tmpIfTest$17 = $(false);
                    if (tmpIfTest$17) {
                      $(`neither`);
                    } else {
                      $(`exit`);
                      break loopStop$9;
                    }
                  }
                  loopStop$10: {
                    const tmpIfTest$18 = $(false);
                    if (tmpIfTest$18) {
                      $(`uhoh`);
                    } else {
                      const tmpIfTest$20 = $(false);
                      if (tmpIfTest$20) {
                        $(`neither`);
                      } else {
                        $(`exit`);
                        break loopStop$10;
                      }
                    }
                    loopStop$11: {
                      const tmpIfTest$19 = $(false);
                      if (tmpIfTest$19) {
                        $(`uhoh`);
                      } else {
                        const tmpIfTest$21 = $(false);
                        if (tmpIfTest$21) {
                          $(`neither`);
                        } else {
                          $(`exit`);
                          break loopStop$11;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpIfTest$22 = $(false);
                        if (tmpIfTest$22) {
                          $(`uhoh`);
                        } else {
                          const tmpIfTest$24 = $(false);
                          if (tmpIfTest$24) {
                            $(`neither`);
                          } else {
                            $(`exit`);
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
$(`woohoo`);
loopStop: {
  let continued = false;
  const tmpIfTest$23 = $(false);
  if (tmpIfTest$23) {
    $(`uhoh`);
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$25 = $(false);
    if (tmpIfTest$25) {
      $(`neither`);
    } else {
      continued = true;
    }
    if (continued) {
    } else {
      $(`exit`);
      break loopStop;
    }
  }
  loopStop$12: {
    let continued$1 = false;
    const tmpIfTest$26 = $(false);
    if (tmpIfTest$26) {
      $(`uhoh`);
    } else {
      continued$1 = true;
    }
    if (continued$1) {
    } else {
      const tmpIfTest$28 = $(false);
      if (tmpIfTest$28) {
        $(`neither`);
      } else {
        continued$1 = true;
      }
      if (continued$1) {
      } else {
        $(`exit`);
        break loopStop$12;
      }
    }
    loopStop$13: {
      let continued$2 = false;
      const tmpIfTest$27 = $(false);
      if (tmpIfTest$27) {
        $(`uhoh`);
      } else {
        continued$2 = true;
      }
      if (continued$2) {
      } else {
        const tmpIfTest$29 = $(false);
        if (tmpIfTest$29) {
          $(`neither`);
        } else {
          continued$2 = true;
        }
        if (continued$2) {
        } else {
          $(`exit`);
          break loopStop$13;
        }
      }
      loopStop$14: {
        let continued$3 = false;
        const tmpIfTest$30 = $(false);
        if (tmpIfTest$30) {
          $(`uhoh`);
        } else {
          continued$3 = true;
        }
        if (continued$3) {
        } else {
          const tmpIfTest$32 = $(false);
          if (tmpIfTest$32) {
            $(`neither`);
          } else {
            continued$3 = true;
          }
          if (continued$3) {
          } else {
            $(`exit`);
            break loopStop$14;
          }
        }
        loopStop$15: {
          let continued$4 = false;
          const tmpIfTest$31 = $(false);
          if (tmpIfTest$31) {
            $(`uhoh`);
          } else {
            continued$4 = true;
          }
          if (continued$4) {
          } else {
            const tmpIfTest$33 = $(false);
            if (tmpIfTest$33) {
              $(`neither`);
            } else {
              continued$4 = true;
            }
            if (continued$4) {
            } else {
              $(`exit`);
              break loopStop$15;
            }
          }
          loopStop$16: {
            let continued$5 = false;
            const tmpIfTest$34 = $(false);
            if (tmpIfTest$34) {
              $(`uhoh`);
            } else {
              continued$5 = true;
            }
            if (continued$5) {
            } else {
              const tmpIfTest$36 = $(false);
              if (tmpIfTest$36) {
                $(`neither`);
              } else {
                continued$5 = true;
              }
              if (continued$5) {
              } else {
                $(`exit`);
                break loopStop$16;
              }
            }
            loopStop$17: {
              let continued$6 = false;
              const tmpIfTest$35 = $(false);
              if (tmpIfTest$35) {
                $(`uhoh`);
              } else {
                continued$6 = true;
              }
              if (continued$6) {
              } else {
                const tmpIfTest$37 = $(false);
                if (tmpIfTest$37) {
                  $(`neither`);
                } else {
                  continued$6 = true;
                }
                if (continued$6) {
                } else {
                  $(`exit`);
                  break loopStop$17;
                }
              }
              loopStop$18: {
                let continued$7 = false;
                const tmpIfTest$38 = $(false);
                if (tmpIfTest$38) {
                  $(`uhoh`);
                } else {
                  continued$7 = true;
                }
                if (continued$7) {
                } else {
                  const tmpIfTest$40 = $(false);
                  if (tmpIfTest$40) {
                    $(`neither`);
                  } else {
                    continued$7 = true;
                  }
                  if (continued$7) {
                  } else {
                    $(`exit`);
                    break loopStop$18;
                  }
                }
                loopStop$19: {
                  let continued$8 = false;
                  const tmpIfTest$39 = $(false);
                  if (tmpIfTest$39) {
                    $(`uhoh`);
                  } else {
                    continued$8 = true;
                  }
                  if (continued$8) {
                  } else {
                    const tmpIfTest$41 = $(false);
                    if (tmpIfTest$41) {
                      $(`neither`);
                    } else {
                      continued$8 = true;
                    }
                    if (continued$8) {
                    } else {
                      $(`exit`);
                      break loopStop$19;
                    }
                  }
                  loopStop$20: {
                    let continued$9 = false;
                    const tmpIfTest$42 = $(false);
                    if (tmpIfTest$42) {
                      $(`uhoh`);
                    } else {
                      continued$9 = true;
                    }
                    if (continued$9) {
                    } else {
                      const tmpIfTest$44 = $(false);
                      if (tmpIfTest$44) {
                        $(`neither`);
                      } else {
                        continued$9 = true;
                      }
                      if (continued$9) {
                      } else {
                        $(`exit`);
                        break loopStop$20;
                      }
                    }
                    loopStop$21: {
                      let continued$10 = false;
                      const tmpIfTest$43 = $(false);
                      if (tmpIfTest$43) {
                        $(`uhoh`);
                      } else {
                        continued$10 = true;
                      }
                      if (continued$10) {
                      } else {
                        const tmpIfTest$45 = $(false);
                        if (tmpIfTest$45) {
                          $(`neither`);
                        } else {
                          continued$10 = true;
                        }
                        if (continued$10) {
                        } else {
                          $(`exit`);
                          break loopStop$21;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        let continued$11 = false;
                        const tmpIfTest$46 = $(false);
                        if (tmpIfTest$46) {
                          $(`uhoh`);
                        } else {
                          continued$11 = true;
                        }
                        if (continued$11) {
                        } else {
                          const tmpIfTest$48 = $(false);
                          if (tmpIfTest$48) {
                            $(`neither`);
                          } else {
                            continued$11 = true;
                          }
                          if (continued$11) {
                          } else {
                            $(`exit`);
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
$(`woohoo`);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop$1: {
  const a = $( false );
  if (a) {
    $( "uhoh" );
  }
  else {
    const b = $( false );
    if (b) {
      $( "neither" );
    }
    else {
      $( "exit" );
      break loopStop$1;
    }
  }
  loopStop$2:   {
    const c = $( false );
    if (c) {
      $( "uhoh" );
    }
    else {
      const d = $( false );
      if (d) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop$2;
      }
    }
    loopStop$3:     {
      const e = $( false );
      if (e) {
        $( "uhoh" );
      }
      else {
        const f = $( false );
        if (f) {
          $( "neither" );
        }
        else {
          $( "exit" );
          break loopStop$3;
        }
      }
      loopStop$4:       {
        const g = $( false );
        if (g) {
          $( "uhoh" );
        }
        else {
          const h = $( false );
          if (h) {
            $( "neither" );
          }
          else {
            $( "exit" );
            break loopStop$4;
          }
        }
        loopStop$5:         {
          const i = $( false );
          if (i) {
            $( "uhoh" );
          }
          else {
            const j = $( false );
            if (j) {
              $( "neither" );
            }
            else {
              $( "exit" );
              break loopStop$5;
            }
          }
          loopStop$6:           {
            const k = $( false );
            if (k) {
              $( "uhoh" );
            }
            else {
              const l = $( false );
              if (l) {
                $( "neither" );
              }
              else {
                $( "exit" );
                break loopStop$6;
              }
            }
            loopStop$7:             {
              const m = $( false );
              if (m) {
                $( "uhoh" );
              }
              else {
                const n = $( false );
                if (n) {
                  $( "neither" );
                }
                else {
                  $( "exit" );
                  break loopStop$7;
                }
              }
              loopStop$8:               {
                const o = $( false );
                if (o) {
                  $( "uhoh" );
                }
                else {
                  const p = $( false );
                  if (p) {
                    $( "neither" );
                  }
                  else {
                    $( "exit" );
                    break loopStop$8;
                  }
                }
                loopStop$9:                 {
                  const q = $( false );
                  if (q) {
                    $( "uhoh" );
                  }
                  else {
                    const r = $( false );
                    if (r) {
                      $( "neither" );
                    }
                    else {
                      $( "exit" );
                      break loopStop$9;
                    }
                  }
                  loopStop$10:                   {
                    const s = $( false );
                    if (s) {
                      $( "uhoh" );
                    }
                    else {
                      const t = $( false );
                      if (t) {
                        $( "neither" );
                      }
                      else {
                        $( "exit" );
                        break loopStop$10;
                      }
                    }
                    loopStop$11:                     {
                      const u = $( false );
                      if (u) {
                        $( "uhoh" );
                      }
                      else {
                        const v = $( false );
                        if (v) {
                          $( "neither" );
                        }
                        else {
                          $( "exit" );
                          break loopStop$11;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const w = $( false );
                        if (w) {
                          $( "uhoh" );
                        }
                        else {
                          const x = $( false );
                          if (x) {
                            $( "neither" );
                          }
                          else {
                            $( "exit" );
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
$( "woohoo" );
loopStop: {
  let y = false;
  const z = $( false );
  if (z) {
    $( "uhoh" );
  }
  else {
    y = true;
  }
  if (y) {

  }
  else {
    const 01 = $( false );
    if (01) {
      $( "neither" );
    }
    else {
      y = true;
    }
    if (y) {

    }
    else {
      $( "exit" );
      break loopStop;
    }
  }
  loopStop$12:   {
    let 11 = false;
    const 21 = $( false );
    if (21) {
      $( "uhoh" );
    }
    else {
      11 = true;
    }
    if (11) {

    }
    else {
      const 31 = $( false );
      if (31) {
        $( "neither" );
      }
      else {
        11 = true;
      }
      if (11) {

      }
      else {
        $( "exit" );
        break loopStop$12;
      }
    }
    loopStop$13:     {
      let 41 = false;
      const 51 = $( false );
      if (51) {
        $( "uhoh" );
      }
      else {
        41 = true;
      }
      if (41) {

      }
      else {
        const 61 = $( false );
        if (61) {
          $( "neither" );
        }
        else {
          41 = true;
        }
        if (41) {

        }
        else {
          $( "exit" );
          break loopStop$13;
        }
      }
      loopStop$14:       {
        let 71 = false;
        const 81 = $( false );
        if (81) {
          $( "uhoh" );
        }
        else {
          71 = true;
        }
        if (71) {

        }
        else {
          const 91 = $( false );
          if (91) {
            $( "neither" );
          }
          else {
            71 = true;
          }
          if (71) {

          }
          else {
            $( "exit" );
            break loopStop$14;
          }
        }
        loopStop$15:         {
          let a1 = false;
          const b1 = $( false );
          if (b1) {
            $( "uhoh" );
          }
          else {
            a1 = true;
          }
          if (a1) {

          }
          else {
            const c1 = $( false );
            if (c1) {
              $( "neither" );
            }
            else {
              a1 = true;
            }
            if (a1) {

            }
            else {
              $( "exit" );
              break loopStop$15;
            }
          }
          loopStop$16:           {
            let d1 = false;
            const e1 = $( false );
            if (e1) {
              $( "uhoh" );
            }
            else {
              d1 = true;
            }
            if (d1) {

            }
            else {
              const f1 = $( false );
              if (f1) {
                $( "neither" );
              }
              else {
                d1 = true;
              }
              if (d1) {

              }
              else {
                $( "exit" );
                break loopStop$16;
              }
            }
            loopStop$17:             {
              let g1 = false;
              const h1 = $( false );
              if (h1) {
                $( "uhoh" );
              }
              else {
                g1 = true;
              }
              if (g1) {

              }
              else {
                const i1 = $( false );
                if (i1) {
                  $( "neither" );
                }
                else {
                  g1 = true;
                }
                if (g1) {

                }
                else {
                  $( "exit" );
                  break loopStop$17;
                }
              }
              loopStop$18:               {
                let j1 = false;
                const k1 = $( false );
                if (k1) {
                  $( "uhoh" );
                }
                else {
                  j1 = true;
                }
                if (j1) {

                }
                else {
                  const l1 = $( false );
                  if (l1) {
                    $( "neither" );
                  }
                  else {
                    j1 = true;
                  }
                  if (j1) {

                  }
                  else {
                    $( "exit" );
                    break loopStop$18;
                  }
                }
                loopStop$19:                 {
                  let m1 = false;
                  const n1 = $( false );
                  if (n1) {
                    $( "uhoh" );
                  }
                  else {
                    m1 = true;
                  }
                  if (m1) {

                  }
                  else {
                    const o1 = $( false );
                    if (o1) {
                      $( "neither" );
                    }
                    else {
                      m1 = true;
                    }
                    if (m1) {

                    }
                    else {
                      $( "exit" );
                      break loopStop$19;
                    }
                  }
                  loopStop$20:                   {
                    let p1 = false;
                    const q1 = $( false );
                    if (q1) {
                      $( "uhoh" );
                    }
                    else {
                      p1 = true;
                    }
                    if (p1) {

                    }
                    else {
                      const r1 = $( false );
                      if (r1) {
                        $( "neither" );
                      }
                      else {
                        p1 = true;
                      }
                      if (p1) {

                      }
                      else {
                        $( "exit" );
                        break loopStop$20;
                      }
                    }
                    loopStop$21:                     {
                      let s1 = false;
                      const t1 = $( false );
                      if (t1) {
                        $( "uhoh" );
                      }
                      else {
                        s1 = true;
                      }
                      if (s1) {

                      }
                      else {
                        const u1 = $( false );
                        if (u1) {
                          $( "neither" );
                        }
                        else {
                          s1 = true;
                        }
                        if (s1) {

                        }
                        else {
                          $( "exit" );
                          break loopStop$21;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        let v1 = false;
                        const w1 = $( false );
                        if (w1) {
                          $( "uhoh" );
                        }
                        else {
                          v1 = true;
                        }
                        if (v1) {

                        }
                        else {
                          const x1 = $( false );
                          if (x1) {
                            $( "neither" );
                          }
                          else {
                            v1 = true;
                          }
                          if (v1) {

                          }
                          else {
                            $( "exit" );
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
$( "woohoo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false
 - 3: 'exit'
 - 4: 'woohoo'
 - 5: false
 - 6: false
 - 7: false
 - 8: false
 - 9: false
 - 10: false
 - 11: false
 - 12: false
 - 13: false
 - 14: false
 - 15: false
 - 16: false
 - 17: false
 - 18: false
 - 19: false
 - 20: false
 - 21: false
 - 22: false
 - 23: false
 - 24: false
 - 25: false
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
