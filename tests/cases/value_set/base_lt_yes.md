# Preval test case

# base_lt_yes.md

> Value set > Base lt yes
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
  
if (n <= 11) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
const t /*:boolean*/ = 0 === x;
if (t) {
  $(`pass`);
} else {
  const tmpClusterSSA_t /*:boolean*/ = 1 === x;
  if (tmpClusterSSA_t) {
    $(`pass`);
  } else {
    const tmpClusterSSA_t$1 /*:boolean*/ = 2 === x;
    if (tmpClusterSSA_t$1) {
      $(`pass`);
    } else {
      const tmpClusterSSA_t$3 /*:boolean*/ = 3 === x;
      if (tmpClusterSSA_t$3) {
        $(`pass`);
      } else {
        const tmpClusterSSA_t$5 /*:boolean*/ = 4 === x;
        if (tmpClusterSSA_t$5) {
          $(`pass`);
        } else {
          const tmpClusterSSA_t$7 /*:boolean*/ = 5 === x;
          if (tmpClusterSSA_t$7) {
            $(`pass`);
          } else {
            const tmpClusterSSA_t$9 /*:boolean*/ = 6 === x;
            if (tmpClusterSSA_t$9) {
              $(`pass`);
            } else {
              const tmpClusterSSA_t$11 /*:boolean*/ = 7 === x;
              if (tmpClusterSSA_t$11) {
                $(`pass`);
              } else {
                const tmpClusterSSA_t$13 /*:boolean*/ = 8 === x;
                if (tmpClusterSSA_t$13) {
                  $(`pass`);
                } else {
                  const tmpClusterSSA_t$15 /*:boolean*/ = 10 === x;
                  if (tmpClusterSSA_t$15) {
                    $(`pass`);
                  } else {
                    const tmpClusterSSA_t$17 /*:boolean*/ = 9 === x;
                    if (tmpClusterSSA_t$17) {
                      $(`pass`);
                    } else {
                      $(`must be 11`);
                      $(`pass`);
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $();
if (0 === x) {
  $(`pass`);
} else {
  if (1 === x) {
    $(`pass`);
  } else {
    if (2 === x) {
      $(`pass`);
    } else {
      if (3 === x) {
        $(`pass`);
      } else {
        if (4 === x) {
          $(`pass`);
        } else {
          if (5 === x) {
            $(`pass`);
          } else {
            if (6 === x) {
              $(`pass`);
            } else {
              if (7 === x) {
                $(`pass`);
              } else {
                if (8 === x) {
                  $(`pass`);
                } else {
                  if (10 === x) {
                    $(`pass`);
                  } else {
                    if (9 === x) {
                      $(`pass`);
                    } else {
                      $(`must be 11`);
                      $(`pass`);
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


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = 0 === a;
if (b) {
  $( "pass" );
}
else {
  const c = 1 === a;
  if (c) {
    $( "pass" );
  }
  else {
    const d = 2 === a;
    if (d) {
      $( "pass" );
    }
    else {
      const e = 3 === a;
      if (e) {
        $( "pass" );
      }
      else {
        const f = 4 === a;
        if (f) {
          $( "pass" );
        }
        else {
          const g = 5 === a;
          if (g) {
            $( "pass" );
          }
          else {
            const h = 6 === a;
            if (h) {
              $( "pass" );
            }
            else {
              const i = 7 === a;
              if (i) {
                $( "pass" );
              }
              else {
                const j = 8 === a;
                if (j) {
                  $( "pass" );
                }
                else {
                  const k = 10 === a;
                  if (k) {
                    $( "pass" );
                  }
                  else {
                    const l = 9 === a;
                    if (l) {
                      $( "pass" );
                    }
                    else {
                      $( "must be 11" );
                      $( "pass" );
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


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 'must be 11'
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
