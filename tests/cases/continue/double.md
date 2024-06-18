# Preval test case

# double.md

> Continue > Double
>
> Simple example

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
loopStop: {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    $(`uhoh`);
  } else {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      $(`neither`);
    } else {
      $(`exit`);
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpIfTest$2 = $(false);
    if (tmpIfTest$2) {
      $(`uhoh`);
    } else {
      const tmpIfTest$4 = $(false);
      if (tmpIfTest$4) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpIfTest$3 = $(false);
      if (tmpIfTest$3) {
        $(`uhoh`);
      } else {
        const tmpIfTest$5 = $(false);
        if (tmpIfTest$5) {
          $(`neither`);
        } else {
          $(`exit`);
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpIfTest$6 = $(false);
        if (tmpIfTest$6) {
          $(`uhoh`);
        } else {
          const tmpIfTest$8 = $(false);
          if (tmpIfTest$8) {
            $(`neither`);
          } else {
            $(`exit`);
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpIfTest$7 = $(false);
          if (tmpIfTest$7) {
            $(`uhoh`);
          } else {
            const tmpIfTest$9 = $(false);
            if (tmpIfTest$9) {
              $(`neither`);
            } else {
              $(`exit`);
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpIfTest$10 = $(false);
            if (tmpIfTest$10) {
              $(`uhoh`);
            } else {
              const tmpIfTest$12 = $(false);
              if (tmpIfTest$12) {
                $(`neither`);
              } else {
                $(`exit`);
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpIfTest$11 = $(false);
              if (tmpIfTest$11) {
                $(`uhoh`);
              } else {
                const tmpIfTest$13 = $(false);
                if (tmpIfTest$13) {
                  $(`neither`);
                } else {
                  $(`exit`);
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpIfTest$14 = $(false);
                if (tmpIfTest$14) {
                  $(`uhoh`);
                } else {
                  const tmpIfTest$16 = $(false);
                  if (tmpIfTest$16) {
                    $(`neither`);
                  } else {
                    $(`exit`);
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpIfTest$15 = $(false);
                  if (tmpIfTest$15) {
                    $(`uhoh`);
                  } else {
                    const tmpIfTest$17 = $(false);
                    if (tmpIfTest$17) {
                      $(`neither`);
                    } else {
                      $(`exit`);
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpIfTest$18 = $(false);
                    if (tmpIfTest$18) {
                      $(`uhoh`);
                    } else {
                      const tmpIfTest$20 = $(false);
                      if (tmpIfTest$20) {
                        $(`neither`);
                      } else {
                        $(`exit`);
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpIfTest$19 = $(false);
                      if (tmpIfTest$19) {
                        $(`uhoh`);
                      } else {
                        const tmpIfTest$21 = $(false);
                        if (tmpIfTest$21) {
                          $(`neither`);
                        } else {
                          $(`exit`);
                          break loopStop$10;
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
loopStop$11: {
  const tmpIfTest$23 = $(false);
  if (tmpIfTest$23) {
    $(`uhoh`);
    const tmpIfTest$25 = $(false);
    if (tmpIfTest$25) {
      $(`neither`);
      $(`exit`);
      break loopStop$11;
    } else {
    }
  } else {
  }
  loopStop$12: {
    const tmpIfTest$26 = $(false);
    if (tmpIfTest$26) {
      $(`uhoh`);
      const tmpIfTest$28 = $(false);
      if (tmpIfTest$28) {
        $(`neither`);
        $(`exit`);
        break loopStop$12;
      } else {
      }
    } else {
    }
    loopStop$13: {
      const tmpIfTest$27 = $(false);
      if (tmpIfTest$27) {
        $(`uhoh`);
        const tmpIfTest$29 = $(false);
        if (tmpIfTest$29) {
          $(`neither`);
          $(`exit`);
          break loopStop$13;
        } else {
        }
      } else {
      }
      loopStop$14: {
        const tmpIfTest$30 = $(false);
        if (tmpIfTest$30) {
          $(`uhoh`);
          const tmpIfTest$32 = $(false);
          if (tmpIfTest$32) {
            $(`neither`);
            $(`exit`);
            break loopStop$14;
          } else {
          }
        } else {
        }
        loopStop$15: {
          const tmpIfTest$31 = $(false);
          if (tmpIfTest$31) {
            $(`uhoh`);
            const tmpIfTest$33 = $(false);
            if (tmpIfTest$33) {
              $(`neither`);
              $(`exit`);
              break loopStop$15;
            } else {
            }
          } else {
          }
          loopStop$16: {
            const tmpIfTest$34 = $(false);
            if (tmpIfTest$34) {
              $(`uhoh`);
              const tmpIfTest$36 = $(false);
              if (tmpIfTest$36) {
                $(`neither`);
                $(`exit`);
                break loopStop$16;
              } else {
              }
            } else {
            }
            loopStop$17: {
              const tmpIfTest$35 = $(false);
              if (tmpIfTest$35) {
                $(`uhoh`);
                const tmpIfTest$37 = $(false);
                if (tmpIfTest$37) {
                  $(`neither`);
                  $(`exit`);
                  break loopStop$17;
                } else {
                }
              } else {
              }
              loopStop$18: {
                const tmpIfTest$38 = $(false);
                if (tmpIfTest$38) {
                  $(`uhoh`);
                  const tmpIfTest$40 = $(false);
                  if (tmpIfTest$40) {
                    $(`neither`);
                    $(`exit`);
                    break loopStop$18;
                  } else {
                  }
                } else {
                }
                loopStop$19: {
                  const tmpIfTest$39 = $(false);
                  if (tmpIfTest$39) {
                    $(`uhoh`);
                    const tmpIfTest$41 = $(false);
                    if (tmpIfTest$41) {
                      $(`neither`);
                      $(`exit`);
                      break loopStop$19;
                    } else {
                    }
                  } else {
                  }
                  loopStop$20: {
                    const tmpIfTest$42 = $(false);
                    if (tmpIfTest$42) {
                      $(`uhoh`);
                      const tmpIfTest$44 = $(false);
                      if (tmpIfTest$44) {
                        $(`neither`);
                        $(`exit`);
                        break loopStop$20;
                      } else {
                      }
                    } else {
                    }
                    loopStop$21: {
                      const tmpIfTest$43 = $(false);
                      if (tmpIfTest$43) {
                        $(`uhoh`);
                        const tmpIfTest$45 = $(false);
                        if (tmpIfTest$45) {
                          $(`neither`);
                          $(`exit`);
                          break loopStop$21;
                        } else {
                        }
                      } else {
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpIfTest$46 = $(false);
                        if (tmpIfTest$46) {
                          $(`uhoh`);
                          const tmpIfTest$48 = $(false);
                          if (tmpIfTest$48) {
                            $(`neither`);
                            $(`exit`);
                            break;
                          } else {
                          }
                        } else {
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
loopStop: {
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
      break loopStop;
    }
  }
  loopStop$1:   {
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
        break loopStop$1;
      }
    }
    loopStop$2:     {
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
          break loopStop$2;
        }
      }
      loopStop$3:       {
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
            break loopStop$3;
          }
        }
        loopStop$4:         {
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
              break loopStop$4;
            }
          }
          loopStop$5:           {
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
                break loopStop$5;
              }
            }
            loopStop$6:             {
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
                  break loopStop$6;
                }
              }
              loopStop$7:               {
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
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
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
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
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
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
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
                          break loopStop$10;
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
loopStop$11: {
  const y = $( false );
  if (y) {
    $( "uhoh" );
    const z = $( false );
    if (z) {
      $( "neither" );
      $( "exit" );
      break loopStop$11;
    }
  }
  loopStop$12:   {
    const 01 = $( false );
    if (01) {
      $( "uhoh" );
      const 11 = $( false );
      if (11) {
        $( "neither" );
        $( "exit" );
        break loopStop$12;
      }
    }
    loopStop$13:     {
      const 21 = $( false );
      if (21) {
        $( "uhoh" );
        const 31 = $( false );
        if (31) {
          $( "neither" );
          $( "exit" );
          break loopStop$13;
        }
      }
      loopStop$14:       {
        const 41 = $( false );
        if (41) {
          $( "uhoh" );
          const 51 = $( false );
          if (51) {
            $( "neither" );
            $( "exit" );
            break loopStop$14;
          }
        }
        loopStop$15:         {
          const 61 = $( false );
          if (61) {
            $( "uhoh" );
            const 71 = $( false );
            if (71) {
              $( "neither" );
              $( "exit" );
              break loopStop$15;
            }
          }
          loopStop$16:           {
            const 81 = $( false );
            if (81) {
              $( "uhoh" );
              const 91 = $( false );
              if (91) {
                $( "neither" );
                $( "exit" );
                break loopStop$16;
              }
            }
            loopStop$17:             {
              const a1 = $( false );
              if (a1) {
                $( "uhoh" );
                const b1 = $( false );
                if (b1) {
                  $( "neither" );
                  $( "exit" );
                  break loopStop$17;
                }
              }
              loopStop$18:               {
                const c1 = $( false );
                if (c1) {
                  $( "uhoh" );
                  const d1 = $( false );
                  if (d1) {
                    $( "neither" );
                    $( "exit" );
                    break loopStop$18;
                  }
                }
                loopStop$19:                 {
                  const e1 = $( false );
                  if (e1) {
                    $( "uhoh" );
                    const f1 = $( false );
                    if (f1) {
                      $( "neither" );
                      $( "exit" );
                      break loopStop$19;
                    }
                  }
                  loopStop$20:                   {
                    const g1 = $( false );
                    if (g1) {
                      $( "uhoh" );
                      const h1 = $( false );
                      if (h1) {
                        $( "neither" );
                        $( "exit" );
                        break loopStop$20;
                      }
                    }
                    loopStop$21:                     {
                      const i1 = $( false );
                      if (i1) {
                        $( "uhoh" );
                        const j1 = $( false );
                        if (j1) {
                          $( "neither" );
                          $( "exit" );
                          break loopStop$21;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const k1 = $( false );
                        if (k1) {
                          $( "uhoh" );
                          const l1 = $( false );
                          if (l1) {
                            $( "neither" );
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
