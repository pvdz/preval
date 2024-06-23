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
loopStop$11: {
  loopStop: {
    const tmpIfTest = $(false);
    loopStop$1: {
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
      const tmpIfTest$2 = $(false);
      loopStop$2: {
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
        const tmpIfTest$3 = $(false);
        loopStop$3: {
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
          const tmpIfTest$6 = $(false);
          loopStop$4: {
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
            const tmpIfTest$7 = $(false);
            loopStop$5: {
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
              const tmpIfTest$10 = $(false);
              loopStop$6: {
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
                const tmpIfTest$11 = $(false);
                loopStop$7: {
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
                  const tmpIfTest$14 = $(false);
                  loopStop$8: {
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
                    const tmpIfTest$15 = $(false);
                    loopStop$9: {
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
                      const tmpIfTest$18 = $(false);
                      loopStop$10: {
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
  const tmpIfTest$23 = $(false);
  loopStop$12: {
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
    const tmpIfTest$26 = $(false);
    loopStop$13: {
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
      const tmpIfTest$27 = $(false);
      loopStop$14: {
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
        const tmpIfTest$30 = $(false);
        loopStop$15: {
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
          const tmpIfTest$31 = $(false);
          loopStop$16: {
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
            const tmpIfTest$34 = $(false);
            loopStop$17: {
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
              const tmpIfTest$35 = $(false);
              loopStop$18: {
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
                const tmpIfTest$38 = $(false);
                loopStop$19: {
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
                  const tmpIfTest$39 = $(false);
                  loopStop$20: {
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
                    const tmpIfTest$42 = $(false);
                    loopStop$21: {
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
loopStop$11: {
  loopStop: {
    const a = $( false );
    loopStop$1: {
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
      const c = $( false );
      loopStop$2: {
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
        const e = $( false );
        loopStop$3: {
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
          const g = $( false );
          loopStop$4: {
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
            const i = $( false );
            loopStop$5: {
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
              const k = $( false );
              loopStop$6: {
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
                const m = $( false );
                loopStop$7: {
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
                  const o = $( false );
                  loopStop$8: {
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
                    const q = $( false );
                    loopStop$9: {
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
                      const s = $( false );
                      loopStop$10: {
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
  const y = $( false );
  loopStop$12: {
    if (y) {
      $( "uhoh" );
      const z = $( false );
      if (z) {
        $( "neither" );
        $( "exit" );
        break loopStop$11;
      }
    }
    const 01 = $( false );
    loopStop$13: {
      if (01) {
        $( "uhoh" );
        const 11 = $( false );
        if (11) {
          $( "neither" );
          $( "exit" );
          break loopStop$12;
        }
      }
      const 21 = $( false );
      loopStop$14: {
        if (21) {
          $( "uhoh" );
          const 31 = $( false );
          if (31) {
            $( "neither" );
            $( "exit" );
            break loopStop$13;
          }
        }
        const 41 = $( false );
        loopStop$15: {
          if (41) {
            $( "uhoh" );
            const 51 = $( false );
            if (51) {
              $( "neither" );
              $( "exit" );
              break loopStop$14;
            }
          }
          const 61 = $( false );
          loopStop$16: {
            if (61) {
              $( "uhoh" );
              const 71 = $( false );
              if (71) {
                $( "neither" );
                $( "exit" );
                break loopStop$15;
              }
            }
            const 81 = $( false );
            loopStop$17: {
              if (81) {
                $( "uhoh" );
                const 91 = $( false );
                if (91) {
                  $( "neither" );
                  $( "exit" );
                  break loopStop$16;
                }
              }
              const a1 = $( false );
              loopStop$18: {
                if (a1) {
                  $( "uhoh" );
                  const b1 = $( false );
                  if (b1) {
                    $( "neither" );
                    $( "exit" );
                    break loopStop$17;
                  }
                }
                const c1 = $( false );
                loopStop$19: {
                  if (c1) {
                    $( "uhoh" );
                    const d1 = $( false );
                    if (d1) {
                      $( "neither" );
                      $( "exit" );
                      break loopStop$18;
                    }
                  }
                  const e1 = $( false );
                  loopStop$20: {
                    if (e1) {
                      $( "uhoh" );
                      const f1 = $( false );
                      if (f1) {
                        $( "neither" );
                        $( "exit" );
                        break loopStop$19;
                      }
                    }
                    const g1 = $( false );
                    loopStop$21: {
                      if (g1) {
                        $( "uhoh" );
                        const h1 = $( false );
                        if (h1) {
                          $( "neither" );
                          $( "exit" );
                          break loopStop$20;
                        }
                      }
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
