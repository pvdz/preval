# Preval test case

# finally_elimination.md

> Try > Finally elimination
>
> This turned ugly fast.

## Options

- globals: a b c d e f ABC DEF

## Input

`````js filename=intro
// Consider a try with a bunch of abrupt completions.
function g() {
  ABC: while (true) {
    try {
      $(a);
      if (b) {
        break ABC;
      }
      if (c) {
        return DEF;
      }
      if (d) {
        throw x;
      }
      if (e) {
        continue ABC;
      }
    } finally {
      $(f);
    }
  }
}
$(g());

// into ->

/*
let action = 0;
let use = undefined;
ABC: while (true)
A: try {
  $(a);
  if ($1) {
    action = 1;
    break A
  }
  if ($2) {
    action = 2;
    use = value;
    break A
  }
  if ($3) {
    action = 3;
    use = x;
    break A
  }
  if ($4) {
    action = 4;
    break A
  }
} catch (e) {
  action = 5;
  use = e;
}

// Finally code here
$(b);

// Transformed continuations (esp. labels)
if (action === 1) break ABC;
if (action === 2) return use;
if (action === 3) throw use;
if (action === 4) continue ABC;
if (action === 5) throw use;
*/
`````


## Settled


`````js filename=intro
let $finalStep /*:boolean*/ = false;
let $finalStep$1 /*:boolean*/ = false;
let $finalStep$3 /*:boolean*/ = false;
let $finalArg /*:unknown*/ = undefined;
let $finalArg$1 /*:unknown*/ = undefined;
try {
  $(a);
  if (b) {
    $finalStep = true;
  } else {
    if (c) {
      $finalStep$1 = true;
      $finalArg = DEF;
    } else {
      if (d) {
        $finalStep$3 = true;
        $finalArg$1 = x;
      } else {
        e;
      }
    }
  }
} catch ($finalImplicit) {
  $(f);
  throw $finalImplicit;
}
$(f);
if ($finalStep) {
  $(undefined);
} else {
  if ($finalStep$1) {
    $($finalArg);
  } else {
    if ($finalStep$3) {
      throw $finalArg$1;
    } else {
      let tmpCalleeParam /*:unknown*/ = undefined;
      while ($LOOP_UNROLL_10) {
        let $finalStep$2 /*:boolean*/ = false;
        let $finalStep$4 /*:boolean*/ = false;
        let $finalStep$6 /*:boolean*/ = false;
        let $finalArg$2 /*:unknown*/ = undefined;
        let $finalArg$4 /*:unknown*/ = undefined;
        try {
          $(a);
          if (b) {
            $finalStep$2 = true;
          } else {
            if (c) {
              $finalStep$4 = true;
              $finalArg$2 = DEF;
            } else {
              if (d) {
                $finalStep$6 = true;
                $finalArg$4 = x;
              } else {
                e;
              }
            }
          }
        } catch ($finalImplicit$1) {
          $(f);
          throw $finalImplicit$1;
        }
        $(f);
        if ($finalStep$2) {
          break;
        } else {
          if ($finalStep$4) {
            tmpCalleeParam = $finalArg$2;
            break;
          } else {
            if ($finalStep$6) {
              throw $finalArg$4;
            } else {
            }
          }
        }
      }
      $(tmpCalleeParam);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $finalStep = false;
let $finalStep$1 = false;
let $finalStep$3 = false;
let $finalArg = undefined;
let $finalArg$1 = undefined;
try {
  $(a);
  if (b) {
    $finalStep = true;
  } else {
    if (c) {
      $finalStep$1 = true;
      $finalArg = DEF;
    } else {
      if (d) {
        $finalStep$3 = true;
        $finalArg$1 = x;
      } else {
        e;
      }
    }
  }
} catch ($finalImplicit) {
  $(f);
  throw $finalImplicit;
}
$(f);
if ($finalStep) {
  $(undefined);
} else {
  if ($finalStep$1) {
    $($finalArg);
  } else {
    if ($finalStep$3) {
      throw $finalArg$1;
    } else {
      let tmpCalleeParam = undefined;
      while (true) {
        let $finalStep$2 = false;
        let $finalStep$4 = false;
        let $finalStep$6 = false;
        let $finalArg$2 = undefined;
        let $finalArg$4 = undefined;
        try {
          $(a);
          if (b) {
            $finalStep$2 = true;
          } else {
            if (c) {
              $finalStep$4 = true;
              $finalArg$2 = DEF;
            } else {
              if (d) {
                $finalStep$6 = true;
                $finalArg$4 = x;
              } else {
                e;
              }
            }
          }
        } catch ($finalImplicit$1) {
          $(f);
          throw $finalImplicit$1;
        }
        $(f);
        if ($finalStep$2) {
          break;
        } else {
          if ($finalStep$4) {
            tmpCalleeParam = $finalArg$2;
            break;
          } else {
            if ($finalStep$6) {
              throw $finalArg$4;
            }
          }
        }
      }
      $(tmpCalleeParam);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let g = false;
let h = false;
let i = false;
let j = undefined;
let k = undefined;
try {
  $( a );
  if (b) {
    g = true;
  }
  else {
    if (c) {
      h = true;
      j = DEF;
    }
    else {
      if (d) {
        i = true;
        k = x;
      }
      else {
        e;
      }
    }
  }
}
catch (l) {
  $( f );
  throw l;
}
$( f );
if (g) {
  $( undefined );
}
else {
  if (h) {
    $( j );
  }
  else {
    if (i) {
      throw k;
    }
    else {
      let m = undefined;
      while ($LOOP_UNROLL_10) {
        let n = false;
        let o = false;
        let p = false;
        let q = undefined;
        let r = undefined;
        try {
          $( a );
          if (b) {
            n = true;
          }
          else {
            if (c) {
              o = true;
              q = DEF;
            }
            else {
              if (d) {
                p = true;
                r = x;
              }
              else {
                e;
              }
            }
          }
        }
        catch (s) {
          $( f );
          throw s;
        }
        $( f );
        if (n) {
          break;
        }
        else {
          if (o) {
            m = q;
            break;
          }
          else {
            if (p) {
              throw r;
            }
          }
        }
      }
      $( m );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  while (true) {
    $continue: {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalStep$1 = false;
      let $finalStep$3 = false;
      let $finalStep$5 = false;
      let $finalCatchArg = undefined;
      let $finalArg = undefined;
      let $finalArg$1 = undefined;
      $finally: {
        try {
          $(a);
          if (b) {
            $finalStep = true;
            break $finally;
          } else {
            if (c) {
              $finalStep$1 = true;
              $finalArg = DEF;
              break $finally;
            } else {
              if (d) {
                $finalStep$3 = true;
                $finalArg$1 = x;
                break $finally;
              } else {
                if (e) {
                  $finalStep$5 = true;
                  break $finally;
                } else {
                }
              }
            }
          }
        } catch ($finalImplicit) {
          $(f);
          throw $finalImplicit;
        }
      }
      $(f);
      if ($implicitThrow) {
        throw $finalCatchArg;
      } else {
        if ($finalStep) {
          break;
        } else {
          if ($finalStep$1) {
            return $finalArg;
          } else {
            if ($finalStep$3) {
              throw $finalArg$1;
            } else {
              if ($finalStep$5) {
                break $continue;
              } else {
              }
            }
          }
        }
      }
    }
  }
  return undefined;
};
let tmpCalleeParam = g();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) can try-escaping support this expr node type? CallExpression


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
