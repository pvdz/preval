# Preval test case

# base_lt_no.md

> Value set > Base lt no
>
> If we know all the values a binding can have then we can resolve certain ops...

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
  
if (n <= 10) {
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
if (n <= 10) {
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
const tmpIfTest = n <= 10;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $();
let n /*:number*/ = 11;
const t /*:boolean*/ = 0 === x;
if (t) {
  n = 0;
} else {
  const tmpClusterSSA_t /*:boolean*/ = 1 === x;
  if (tmpClusterSSA_t) {
    n = 1;
  } else {
    const tmpClusterSSA_t$1 /*:boolean*/ = 2 === x;
    if (tmpClusterSSA_t$1) {
      n = 2;
    } else {
      const tmpClusterSSA_t$3 /*:boolean*/ = 3 === x;
      if (tmpClusterSSA_t$3) {
        n = 3;
      } else {
        const tmpClusterSSA_t$5 /*:boolean*/ = 4 === x;
        if (tmpClusterSSA_t$5) {
          n = 4;
        } else {
          const tmpClusterSSA_t$7 /*:boolean*/ = 5 === x;
          if (tmpClusterSSA_t$7) {
            n = 5;
          } else {
            const tmpClusterSSA_t$9 /*:boolean*/ = 6 === x;
            if (tmpClusterSSA_t$9) {
              n = 6;
            } else {
              const tmpClusterSSA_t$11 /*:boolean*/ = 7 === x;
              if (tmpClusterSSA_t$11) {
                n = 7;
              } else {
                const tmpClusterSSA_t$13 /*:boolean*/ = 8 === x;
                if (tmpClusterSSA_t$13) {
                  n = 8;
                } else {
                  const tmpClusterSSA_t$15 /*:boolean*/ = 10 === x;
                  if (tmpClusterSSA_t$15) {
                    n = 9;
                  } else {
                    const tmpClusterSSA_t$17 /*:boolean*/ = 9 === x;
                    if (tmpClusterSSA_t$17) {
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
const tmpIfTest /*:boolean*/ = n <= 10;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
let b = 11;
const c = 0 === a;
if (c) {
  b = 0;
}
else {
  const d = 1 === a;
  if (d) {
    b = 1;
  }
  else {
    const e = 2 === a;
    if (e) {
      b = 2;
    }
    else {
      const f = 3 === a;
      if (f) {
        b = 3;
      }
      else {
        const g = 4 === a;
        if (g) {
          b = 4;
        }
        else {
          const h = 5 === a;
          if (h) {
            b = 5;
          }
          else {
            const i = 6 === a;
            if (i) {
              b = 6;
            }
            else {
              const j = 7 === a;
              if (j) {
                b = 7;
              }
              else {
                const k = 8 === a;
                if (k) {
                  b = 8;
                }
                else {
                  const l = 10 === a;
                  if (l) {
                    b = 9;
                  }
                  else {
                    const m = 9 === a;
                    if (m) {
                      b = 10;
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
const n = b <= 10;
if (n) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 'must be 11'
 - 3: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
