# Preval test case

# base_lt_yes.md

> Value set > Base lt yes
>
> If we know all the values a binding can have then we can resolve certain ops...

#TODO

## Input

`````js filename=intro
const x = $();
let n = 11;
let t = 0 === x;
if (t) {
  n = 0;
} else {
  t = 1 === x;
  if (t) {
    n = 1;
  } else {
    t = 2 === x;
    if (t) {
      n = 2;
    } else {
      t = 3 === x;
      if (t) {
        n = 3;
      } else {
        t = 4 === x;
        if (t) {
          n = 4;
        } else {
          t = 5 === x;
          if (t) {
            n = 5;
          } else {
            t = 6 === x;
            if (t) {
              n = 6;
            } else {
              t = 7 === x;
              if (t) {
                n = 7;
              } else {
                t = 8 === x;
                if (t) {
                  n = 8;
                } else {
                  t = 10 === x;
                  if (t) {
                    n = 9;
                  } else {
                    t = 9 === x;
                    if (t) {
                      n = 10;
                    } else {
                      $('must be 11');
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
  
if (n <= 11) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal


`````js filename=intro
const x = $();
let n = 11;
let t = 0 === x;
if (t) {
  n = 0;
} else {
  t = 1 === x;
  if (t) {
    n = 1;
  } else {
    t = 2 === x;
    if (t) {
      n = 2;
    } else {
      t = 3 === x;
      if (t) {
        n = 3;
      } else {
        t = 4 === x;
        if (t) {
          n = 4;
        } else {
          t = 5 === x;
          if (t) {
            n = 5;
          } else {
            t = 6 === x;
            if (t) {
              n = 6;
            } else {
              t = 7 === x;
              if (t) {
                n = 7;
              } else {
                t = 8 === x;
                if (t) {
                  n = 8;
                } else {
                  t = 10 === x;
                  if (t) {
                    n = 9;
                  } else {
                    t = 9 === x;
                    if (t) {
                      n = 10;
                    } else {
                      $(`must be 11`);
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
if (n <= 11) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const x = $();
let n = 11;
let t = 0 === x;
if (t) {
  n = 0;
} else {
  t = 1 === x;
  if (t) {
    n = 1;
  } else {
    t = 2 === x;
    if (t) {
      n = 2;
    } else {
      t = 3 === x;
      if (t) {
        n = 3;
      } else {
        t = 4 === x;
        if (t) {
          n = 4;
        } else {
          t = 5 === x;
          if (t) {
            n = 5;
          } else {
            t = 6 === x;
            if (t) {
              n = 6;
            } else {
              t = 7 === x;
              if (t) {
                n = 7;
              } else {
                t = 8 === x;
                if (t) {
                  n = 8;
                } else {
                  t = 10 === x;
                  if (t) {
                    n = 9;
                  } else {
                    t = 9 === x;
                    if (t) {
                      n = 10;
                    } else {
                      $(`must be 11`);
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
const tmpIfTest = n <= 11;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const x = $();
const t = 0 === x;
if (t) {
} else {
  const tmpClusterSSA_t = 1 === x;
  if (tmpClusterSSA_t) {
  } else {
    const tmpClusterSSA_t$1 = 2 === x;
    if (tmpClusterSSA_t$1) {
    } else {
      const tmpClusterSSA_t$3 = 3 === x;
      if (tmpClusterSSA_t$3) {
      } else {
        const tmpClusterSSA_t$5 = 4 === x;
        if (tmpClusterSSA_t$5) {
        } else {
          const tmpClusterSSA_t$7 = 5 === x;
          if (tmpClusterSSA_t$7) {
          } else {
            const tmpClusterSSA_t$9 = 6 === x;
            if (tmpClusterSSA_t$9) {
            } else {
              const tmpClusterSSA_t$11 = 7 === x;
              if (tmpClusterSSA_t$11) {
              } else {
                const tmpClusterSSA_t$13 = 8 === x;
                if (tmpClusterSSA_t$13) {
                } else {
                  const tmpClusterSSA_t$15 = 10 === x;
                  if (tmpClusterSSA_t$15) {
                  } else {
                    const tmpClusterSSA_t$17 = 9 === x;
                    if (tmpClusterSSA_t$17) {
                    } else {
                      $(`must be 11`);
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
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = 0 === a;
if (b) {

}
else {
  const c = 1 === a;
  if (c) {

  }
  else {
    const d = 2 === a;
    if (d) {

    }
    else {
      const e = 3 === a;
      if (e) {

      }
      else {
        const f = 4 === a;
        if (f) {

        }
        else {
          const g = 5 === a;
          if (g) {

          }
          else {
            const h = 6 === a;
            if (h) {

            }
            else {
              const i = 7 === a;
              if (i) {

              }
              else {
                const j = 8 === a;
                if (j) {

                }
                else {
                  const k = 10 === a;
                  if (k) {

                  }
                  else {
                    const l = 9 === a;
                    if (l) {

                    }
                    else {
                      $( "must be 11" );
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
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 'must be 11'
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
