# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $(1) ? 2 : $($(100))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $(1) ? 2 : $($(100)))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = 2;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
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
let a = 2;
loopStop: {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
    if (a) {
      $(1);
    } else {
      break loopStop;
    }
  }
  loopStop$1: {
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpCalleeParam$1 = $(100);
      a = $(tmpCalleeParam$1);
      if (a) {
        $(1);
      } else {
        break loopStop$1;
      }
    }
    loopStop$2: {
      const tmpIfTest$3 = $(1);
      if (tmpIfTest$3) {
        $(1);
      } else {
        const tmpCalleeParam$2 = $(100);
        a = $(tmpCalleeParam$2);
        if (a) {
          $(1);
        } else {
          break loopStop$2;
        }
      }
      loopStop$3: {
        const tmpIfTest$4 = $(1);
        if (tmpIfTest$4) {
          $(1);
        } else {
          const tmpCalleeParam$3 = $(100);
          a = $(tmpCalleeParam$3);
          if (a) {
            $(1);
          } else {
            break loopStop$3;
          }
        }
        loopStop$4: {
          const tmpIfTest$5 = $(1);
          if (tmpIfTest$5) {
            $(1);
          } else {
            const tmpCalleeParam$4 = $(100);
            a = $(tmpCalleeParam$4);
            if (a) {
              $(1);
            } else {
              break loopStop$4;
            }
          }
          loopStop$5: {
            const tmpIfTest$6 = $(1);
            if (tmpIfTest$6) {
              $(1);
            } else {
              const tmpCalleeParam$5 = $(100);
              a = $(tmpCalleeParam$5);
              if (a) {
                $(1);
              } else {
                break loopStop$5;
              }
            }
            loopStop$6: {
              const tmpIfTest$7 = $(1);
              if (tmpIfTest$7) {
                $(1);
              } else {
                const tmpCalleeParam$6 = $(100);
                a = $(tmpCalleeParam$6);
                if (a) {
                  $(1);
                } else {
                  break loopStop$6;
                }
              }
              loopStop$7: {
                const tmpIfTest$8 = $(1);
                if (tmpIfTest$8) {
                  $(1);
                } else {
                  const tmpCalleeParam$7 = $(100);
                  a = $(tmpCalleeParam$7);
                  if (a) {
                    $(1);
                  } else {
                    break loopStop$7;
                  }
                }
                loopStop$8: {
                  const tmpIfTest$9 = $(1);
                  if (tmpIfTest$9) {
                    $(1);
                  } else {
                    const tmpCalleeParam$8 = $(100);
                    a = $(tmpCalleeParam$8);
                    if (a) {
                      $(1);
                    } else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9: {
                    const tmpIfTest$10 = $(1);
                    if (tmpIfTest$10) {
                      $(1);
                    } else {
                      const tmpCalleeParam$9 = $(100);
                      a = $(tmpCalleeParam$9);
                      if (a) {
                        $(1);
                      } else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10: {
                      const tmpIfTest$11 = $(1);
                      if (tmpIfTest$11) {
                        $(1);
                      } else {
                        const tmpCalleeParam$10 = $(100);
                        a = $(tmpCalleeParam$10);
                        if (a) {
                          $(1);
                        } else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const tmpIfTest$12 = $(1);
                        if (tmpIfTest$12) {
                          $(1);
                        } else {
                          const tmpCalleeParam$11 = $(100);
                          a = $(tmpCalleeParam$11);
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
let a = 2;
loopStop: {
  const b = $( 1 );
  if (b) {
    $( 1 );
  }
  else {
    const c = $( 100 );
    a = $( c );
    if (a) {
      $( 1 );
    }
    else {
      break loopStop;
    }
  }
  loopStop$1:   {
    const d = $( 1 );
    if (d) {
      $( 1 );
    }
    else {
      const e = $( 100 );
      a = $( e );
      if (a) {
        $( 1 );
      }
      else {
        break loopStop$1;
      }
    }
    loopStop$2:     {
      const f = $( 1 );
      if (f) {
        $( 1 );
      }
      else {
        const g = $( 100 );
        a = $( g );
        if (a) {
          $( 1 );
        }
        else {
          break loopStop$2;
        }
      }
      loopStop$3:       {
        const h = $( 1 );
        if (h) {
          $( 1 );
        }
        else {
          const i = $( 100 );
          a = $( i );
          if (a) {
            $( 1 );
          }
          else {
            break loopStop$3;
          }
        }
        loopStop$4:         {
          const j = $( 1 );
          if (j) {
            $( 1 );
          }
          else {
            const k = $( 100 );
            a = $( k );
            if (a) {
              $( 1 );
            }
            else {
              break loopStop$4;
            }
          }
          loopStop$5:           {
            const l = $( 1 );
            if (l) {
              $( 1 );
            }
            else {
              const m = $( 100 );
              a = $( m );
              if (a) {
                $( 1 );
              }
              else {
                break loopStop$5;
              }
            }
            loopStop$6:             {
              const n = $( 1 );
              if (n) {
                $( 1 );
              }
              else {
                const o = $( 100 );
                a = $( o );
                if (a) {
                  $( 1 );
                }
                else {
                  break loopStop$6;
                }
              }
              loopStop$7:               {
                const p = $( 1 );
                if (p) {
                  $( 1 );
                }
                else {
                  const q = $( 100 );
                  a = $( q );
                  if (a) {
                    $( 1 );
                  }
                  else {
                    break loopStop$7;
                  }
                }
                loopStop$8:                 {
                  const r = $( 1 );
                  if (r) {
                    $( 1 );
                  }
                  else {
                    const s = $( 100 );
                    a = $( s );
                    if (a) {
                      $( 1 );
                    }
                    else {
                      break loopStop$8;
                    }
                  }
                  loopStop$9:                   {
                    const t = $( 1 );
                    if (t) {
                      $( 1 );
                    }
                    else {
                      const u = $( 100 );
                      a = $( u );
                      if (a) {
                        $( 1 );
                      }
                      else {
                        break loopStop$9;
                      }
                    }
                    loopStop$10:                     {
                      const v = $( 1 );
                      if (v) {
                        $( 1 );
                      }
                      else {
                        const w = $( 100 );
                        a = $( w );
                        if (a) {
                          $( 1 );
                        }
                        else {
                          break loopStop$10;
                        }
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        const x = $( 1 );
                        if (x) {
                          $( 1 );
                        }
                        else {
                          const y = $( 100 );
                          a = $( y );
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
