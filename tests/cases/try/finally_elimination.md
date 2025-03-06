# Preval test case

# finally_elimination.md

> Try > Finally elimination
>
> This turned ugly fast.

## Input

`````js filename=intro
// Consider a silly try with a bunch of abrupt completions.
function f() {
  ABC: while (true) {
    try {
      $(a);
      if ($1) {
        break ABC;
      }
      if ($2) {
        return value;
      }
      if ($3) {
        throw x;
      }
      if ($4) {
        continue ABC;
      }
    } finally {
      $(b);
    }
  }
}
$(f);

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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  ABC: while (true) {
    $continue: {
      {
        {
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
              if ($1) {
                {
                  $finalStep = true;
                  break $finally;
                }
              }
              if ($2) {
                {
                  $finalStep$1 = true;
                  $finalArg = value;
                  break $finally;
                }
              }
              if ($3) {
                {
                  $finalStep$3 = true;
                  $finalArg$1 = x;
                  break $finally;
                }
              }
              if ($4) {
                {
                  $finalStep$5 = true;
                  break $finally;
                }
              }
            } catch ($finalImplicit) {
              $(b);
              throw $finalImplicit;
            }
          }
          {
            $(b);
          }
          if ($implicitThrow) throw $finalCatchArg;
          else if ($finalStep) break ABC;
          else if ($finalStep$1) return $finalArg;
          else if ($finalStep$3) throw $finalArg$1;
          else if ($finalStep$5) break $continue;
          else {
          }
        }
      }
    }
  }
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
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
          if ($1) {
            $finalStep = true;
            break $finally;
          } else {
            if ($2) {
              $finalStep$1 = true;
              $finalArg = value;
              break $finally;
            } else {
              if ($3) {
                $finalStep$3 = true;
                $finalArg$1 = x;
                break $finally;
              } else {
                if ($4) {
                  $finalStep$5 = true;
                  break $finally;
                } else {
                }
              }
            }
          }
        } catch ($finalImplicit) {
          $(b);
          throw $finalImplicit;
        }
      }
      $(b);
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
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  let $finalStep /*:boolean*/ = false;
  let $finalStep$1 /*:boolean*/ = false;
  let $finalStep$3 /*:boolean*/ = false;
  let $finalArg /*:unknown*/ = undefined;
  let $finalArg$1 /*:unknown*/ = undefined;
  try {
    $(a);
    if ($1) {
      $finalStep = true;
    } else {
      if ($2) {
        $finalStep$1 = true;
        $finalArg = value;
      } else {
        if ($3) {
          $finalStep$3 = true;
          $finalArg$1 = x;
        } else {
          $4;
        }
      }
    }
  } catch ($finalImplicit) {
    $(b);
    throw $finalImplicit;
  }
  $(b);
  if ($finalStep) {
    return undefined;
  } else {
    if ($finalStep$1) {
      return $finalArg;
    } else {
      if ($finalStep$3) {
        throw $finalArg$1;
      } else {
        while ($LOOP_UNROLL_10) {
          let $finalStep$2 /*:boolean*/ = false;
          let $finalStep$4 /*:boolean*/ = false;
          let $finalStep$6 /*:boolean*/ = false;
          let $finalArg$2 /*:unknown*/ = undefined;
          let $finalArg$4 /*:unknown*/ = undefined;
          try {
            $(a);
            if ($1) {
              $finalStep$2 = true;
            } else {
              if ($2) {
                $finalStep$4 = true;
                $finalArg$2 = value;
              } else {
                if ($3) {
                  $finalStep$6 = true;
                  $finalArg$4 = x;
                } else {
                  $4;
                }
              }
            }
          } catch ($finalImplicit$1) {
            $(b);
            throw $finalImplicit$1;
          }
          $(b);
          if ($finalStep$2) {
            break;
          } else {
            if ($finalStep$4) {
              return $finalArg$2;
            } else {
              if ($finalStep$6) {
                throw $finalArg$4;
              } else {
              }
            }
          }
        }
        return undefined;
      }
    }
  }
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const c = function() {
  debugger;
  let d = false;
  let e = false;
  let f = false;
  let g = undefined;
  let h = undefined;
  try {
    $( a );
    if ($1) {
      d = true;
    }
    else {
      if ($2) {
        e = true;
        g = value;
      }
      else {
        if ($3) {
          f = true;
          h = x;
        }
        else {
          $4;
        }
      }
    }
  }
  catch (i) {
    $( b );
    throw i;
  }
  $( b );
  if (d) {
    return undefined;
  }
  else {
    if (e) {
      return g;
    }
    else {
      if (f) {
        throw h;
      }
      else {
        while ($LOOP_UNROLL_10) {
          let j = false;
          let k = false;
          let l = false;
          let m = undefined;
          let n = undefined;
          try {
            $( a );
            if ($1) {
              j = true;
            }
            else {
              if ($2) {
                k = true;
                m = value;
              }
              else {
                if ($3) {
                  l = true;
                  n = x;
                }
                else {
                  $4;
                }
              }
            }
          }
          catch (o) {
            $( b );
            throw o;
          }
          $( b );
          if (j) {
            break;
          }
          else {
            if (k) {
              return m;
            }
            else {
              if (l) {
                throw n;
              }
            }
          }
        }
        return undefined;
      }
    }
  }
};
$( c );
`````

## Globals

BAD@! Found 8 implicit global bindings:

a, $1, $2, value, $3, x, $4, b

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Support this node type in isFree: DebuggerStatement
- Support this node type in isFree: LabeledStatement