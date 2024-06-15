# Preval test case

# try.md

> Unroll loop with true > Try
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
  try {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
  } catch (e) {
    $('error', e);
  }
}
`````

## Pre Normal


`````js filename=intro
while (true) {
  try {
    const test = $(`first`);
    $(`second`);
    if (test) {
      break;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`, e);
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  try {
    const test = $(`first`);
    $(`second`);
    if (test) {
      break;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`, e);
  }
}
`````

## Output


`````js filename=intro
loopStop: {
  try {
    const test = $(`first`);
    $(`second`);
    if (test) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`, e);
  }
  loopStop$1: {
    try {
      const test$1 = $(`first`);
      $(`second`);
      if (test$1) {
        break loopStop$1;
      } else {
        $(`third`);
      }
    } catch (e$1) {
      $(`error`, e$1);
    }
    loopStop$2: {
      try {
        const test$2 = $(`first`);
        $(`second`);
        if (test$2) {
          break loopStop$2;
        } else {
          $(`third`);
        }
      } catch (e$2) {
        $(`error`, e$2);
      }
      loopStop$3: {
        try {
          const test$3 = $(`first`);
          $(`second`);
          if (test$3) {
            break loopStop$3;
          } else {
            $(`third`);
          }
        } catch (e$3) {
          $(`error`, e$3);
        }
        loopStop$4: {
          try {
            const test$4 = $(`first`);
            $(`second`);
            if (test$4) {
              break loopStop$4;
            } else {
              $(`third`);
            }
          } catch (e$4) {
            $(`error`, e$4);
          }
          loopStop$5: {
            try {
              const test$5 = $(`first`);
              $(`second`);
              if (test$5) {
                break loopStop$5;
              } else {
                $(`third`);
              }
            } catch (e$5) {
              $(`error`, e$5);
            }
            loopStop$6: {
              try {
                const test$6 = $(`first`);
                $(`second`);
                if (test$6) {
                  break loopStop$6;
                } else {
                  $(`third`);
                }
              } catch (e$6) {
                $(`error`, e$6);
              }
              loopStop$7: {
                try {
                  const test$7 = $(`first`);
                  $(`second`);
                  if (test$7) {
                    break loopStop$7;
                  } else {
                    $(`third`);
                  }
                } catch (e$7) {
                  $(`error`, e$7);
                }
                loopStop$8: {
                  try {
                    const test$8 = $(`first`);
                    $(`second`);
                    if (test$8) {
                      break loopStop$8;
                    } else {
                      $(`third`);
                    }
                  } catch (e$8) {
                    $(`error`, e$8);
                  }
                  loopStop$9: {
                    try {
                      const test$9 = $(`first`);
                      $(`second`);
                      if (test$9) {
                        break loopStop$9;
                      } else {
                        $(`third`);
                      }
                    } catch (e$9) {
                      $(`error`, e$9);
                    }
                    loopStop$10: {
                      try {
                        const test$10 = $(`first`);
                        $(`second`);
                        if (test$10) {
                          break loopStop$10;
                        } else {
                          $(`third`);
                        }
                      } catch (e$10) {
                        $(`error`, e$10);
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        try {
                          const test$11 = $(`first`);
                          $(`second`);
                          if (test$11) {
                            break;
                          } else {
                            $(`third`);
                          }
                        } catch (e$11) {
                          $(`error`, e$11);
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
`````

## PST Output

With rename=true

`````js filename=intro
loopStop: {
  try {
    const a = $( "first" );
    $( "second" );
    if (a) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
catch (b) {
    $( "error", b );
  }
  loopStop$1:   {
    try {
      const c = $( "first" );
      $( "second" );
      if (c) {
        break loopStop$1;
      }
      else {
        $( "third" );
      }
    }
catch (d) {
      $( "error", d );
    }
    loopStop$2:     {
      try {
        const e = $( "first" );
        $( "second" );
        if (e) {
          break loopStop$2;
        }
        else {
          $( "third" );
        }
      }
catch (f) {
        $( "error", f );
      }
      loopStop$3:       {
        try {
          const g = $( "first" );
          $( "second" );
          if (g) {
            break loopStop$3;
          }
          else {
            $( "third" );
          }
        }
catch (h) {
          $( "error", h );
        }
        loopStop$4:         {
          try {
            const i = $( "first" );
            $( "second" );
            if (i) {
              break loopStop$4;
            }
            else {
              $( "third" );
            }
          }
catch (j) {
            $( "error", j );
          }
          loopStop$5:           {
            try {
              const k = $( "first" );
              $( "second" );
              if (k) {
                break loopStop$5;
              }
              else {
                $( "third" );
              }
            }
catch (l) {
              $( "error", l );
            }
            loopStop$6:             {
              try {
                const m = $( "first" );
                $( "second" );
                if (m) {
                  break loopStop$6;
                }
                else {
                  $( "third" );
                }
              }
catch (n) {
                $( "error", n );
              }
              loopStop$7:               {
                try {
                  const o = $( "first" );
                  $( "second" );
                  if (o) {
                    break loopStop$7;
                  }
                  else {
                    $( "third" );
                  }
                }
catch (p) {
                  $( "error", p );
                }
                loopStop$8:                 {
                  try {
                    const q = $( "first" );
                    $( "second" );
                    if (q) {
                      break loopStop$8;
                    }
                    else {
                      $( "third" );
                    }
                  }
catch (r) {
                    $( "error", r );
                  }
                  loopStop$9:                   {
                    try {
                      const s = $( "first" );
                      $( "second" );
                      if (s) {
                        break loopStop$9;
                      }
                      else {
                        $( "third" );
                      }
                    }
catch (t) {
                      $( "error", t );
                    }
                    loopStop$10:                     {
                      try {
                        const u = $( "first" );
                        $( "second" );
                        if (u) {
                          break loopStop$10;
                        }
                        else {
                          $( "third" );
                        }
                      }
catch (v) {
                        $( "error", v );
                      }
                      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
                        try {
                          const w = $( "first" );
                          $( "second" );
                          if (w) {
                            break;
                          }
                          else {
                            $( "third" );
                          }
                        }
catch (x) {
                          $( "error", x );
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
