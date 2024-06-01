# Preval test case

# try_hell_all.md

> Flow > Try hell all
>
> This is why we don't properly analyze the try/catch/finally for mutation state. And this is just the tip of the ice berg. No thank you.

#TODO

## Input

`````js filename=intro
{
  let x = 0;
  try {
    x = 1
  } catch {
  
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  try {
    
  } catch {
    x = 1
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  try {
  
  } finally {
    x = 1
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  try {
    x = 1
  } catch {
  
  } finally {
  
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  try {
    x = 1
  } catch {
  
  } finally {
  
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  try {
  
  } catch {
    x = 1
  } finally {
  
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  try {
  
  } catch {
  
  } finally {
    x = 1
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  foo: {
    try {
      if ($) break foo;
    } catch {
      // Now we know it can't get here
      // Though in real world code a throw can happen pretty much anywhere
      // So we must assume the worst and consider the catch potentially visited
      // So we must consider x might have mutated after the try is resolved
      x = 1
    } finally {
    
    }
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  foo: {
    try {
      break foo;
    } catch {
    
    } finally {
      // The finally always executes so there's no question that x mutates
      x = 1
    }
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  foo: {
    try {
      break foo;
    } catch {
    
    } finally {
      // The finally always executes so there's no question that x mutates
      x = 1
    }
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  foo: {
    try {
      break foo;
    } catch {
    
    } finally {
      // The finally always executes so there's no question that x mutates
      x = 1
    }
  }
  considerMutated(x) // always true
}

{
  let x = 0;
  function f(){
    foo: {
      try {
        break foo;
      } finally {
        return
      }
      // This is dead code regardless?
      console.log(x);
    }
    // Dead code because the finalizer return overrides the break
    x = 'fail';
  }
  f();
  considerMutated(x) // always false
}

{
  let x = 0;
  function f(){
    foo: {
      try {
        throw 'not me';
      } finally {
        return
      }
    }
  }
  f();
  considerMutated(x) // always false
}

{
  let x = 0;
  function f() {
    stop: try {
      throw x;
    } finally {
      break stop; // Overrides the throw
    }
    x = 1;
  }
  f();
  considerMutated(x) // always true (!)
}

{
  let x = 0;
  function f() {
    stop: try {
      throw 'one';
    } catch {
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
    x = 1;
  }
  f();
  considerMutated(x) // always true (!)
}

{
  let x = 0;
  function f() {
    stop: try {
      x = 1;
      throw 'one';
    } catch {
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
  }
  f();
  considerMutated(x) // always true (!)
}

{
  let x = 0;
  function f() {
    stop: try {
      throw 'one';
    } catch {
      x = 2;
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
  }
  f();
  considerMutated(x) // always true (!)
}
`````

## Pre Normal

`````js filename=intro
{
  let x = 0;
  try {
    x = 1;
  } catch (e) {}
  considerMutated(x);
}
{
  let x$1 = 0;
  try {
  } catch (e$1) {
    x$1 = 1;
  }
  considerMutated(x$1);
}
{
  let x$3 = 0;
  {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      x$3 = 1;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else {
    }
  }
  considerMutated(x$3);
}
{
  let x$5 = 0;
  {
    let $implicitThrow$1 = false;
    let $finalCatchArg$1 = undefined;
    $finally$1: {
      try {
        x$5 = 1;
      } catch ($finalImplicit$1) {
        $implicitThrow$1 = true;
        $finalCatchArg$1 = $finalImplicit$1;
      }
    }
    {
    }
    if ($implicitThrow$1) throw $finalCatchArg$1;
    else {
    }
  }
  considerMutated(x$5);
}
{
  let x$7 = 0;
  {
    let $implicitThrow$3 = false;
    let $finalCatchArg$3 = undefined;
    $finally$3: {
      try {
        x$7 = 1;
      } catch ($finalImplicit$3) {
        $implicitThrow$3 = true;
        $finalCatchArg$3 = $finalImplicit$3;
      }
    }
    {
    }
    if ($implicitThrow$3) throw $finalCatchArg$3;
    else {
    }
  }
  considerMutated(x$7);
}
{
  let x$9 = 0;
  {
    let $implicitThrow$5 = false;
    let $finalCatchArg$5 = undefined;
    $finally$5: {
      try {
      } catch ($finalImplicit$5) {
        $implicitThrow$5 = true;
        $finalCatchArg$5 = $finalImplicit$5;
      }
    }
    {
    }
    if ($implicitThrow$5) throw $finalCatchArg$5;
    else {
    }
  }
  considerMutated(x$9);
}
{
  let x$11 = 0;
  {
    let $implicitThrow$7 = false;
    let $finalCatchArg$7 = undefined;
    $finally$7: {
      try {
      } catch ($finalImplicit$7) {
        $implicitThrow$7 = true;
        $finalCatchArg$7 = $finalImplicit$7;
      }
    }
    {
      x$11 = 1;
    }
    if ($implicitThrow$7) throw $finalCatchArg$7;
    else {
    }
  }
  considerMutated(x$11);
}
{
  let x$13 = 0;
  foo: {
    {
      let $implicitThrow$9 = false;
      let $finalStep = false;
      let $finalCatchArg$9 = undefined;
      $finally$9: {
        try {
          if ($) {
            $finalStep = true;
            break $finally$9;
          }
        } catch ($finalImplicit$9) {
          $implicitThrow$9 = true;
          $finalCatchArg$9 = $finalImplicit$9;
        }
      }
      {
      }
      if ($implicitThrow$9) throw $finalCatchArg$9;
      else if ($finalStep) break foo;
      else {
      }
    }
  }
  considerMutated(x$13);
}
{
  let x$15 = 0;
  foo$1: {
    {
      let $implicitThrow$11 = false;
      let $finalStep$1 = false;
      let $finalCatchArg$11 = undefined;
      $finally$11: {
        try {
          {
            $finalStep$1 = true;
            break $finally$11;
          }
        } catch ($finalImplicit$11) {
          $implicitThrow$11 = true;
          $finalCatchArg$11 = $finalImplicit$11;
        }
      }
      {
        x$15 = 1;
      }
      if ($implicitThrow$11) throw $finalCatchArg$11;
      else break foo$1;
    }
  }
  considerMutated(x$15);
}
{
  let x$17 = 0;
  foo$3: {
    {
      let $implicitThrow$13 = false;
      let $finalStep$3 = false;
      let $finalCatchArg$13 = undefined;
      $finally$13: {
        try {
          {
            $finalStep$3 = true;
            break $finally$13;
          }
        } catch ($finalImplicit$13) {
          $implicitThrow$13 = true;
          $finalCatchArg$13 = $finalImplicit$13;
        }
      }
      {
        x$17 = 1;
      }
      if ($implicitThrow$13) throw $finalCatchArg$13;
      else break foo$3;
    }
  }
  considerMutated(x$17);
}
{
  let x$19 = 0;
  foo$5: {
    {
      let $implicitThrow$15 = false;
      let $finalStep$5 = false;
      let $finalCatchArg$15 = undefined;
      $finally$15: {
        try {
          {
            $finalStep$5 = true;
            break $finally$15;
          }
        } catch ($finalImplicit$15) {
          $implicitThrow$15 = true;
          $finalCatchArg$15 = $finalImplicit$15;
        }
      }
      {
        x$19 = 1;
      }
      if ($implicitThrow$15) throw $finalCatchArg$15;
      else break foo$5;
    }
  }
  considerMutated(x$19);
}
{
  let f = function () {
    debugger;
    foo$7: {
      {
        let $implicitThrow$17 = false;
        let $finalStep$7 = false;
        let $finalCatchArg$17 = undefined;
        $finally$17: {
          try {
            {
              $finalStep$7 = true;
              break $finally$17;
            }
          } catch ($finalImplicit$17) {
            $implicitThrow$17 = true;
            $finalCatchArg$17 = $finalImplicit$17;
          }
        }
        {
          return;
        }
        if ($implicitThrow$17) throw $finalCatchArg$17;
        else break foo$7;
      }
      console.log(x$21);
    }
    x$21 = `fail`;
  };
  let x$21 = 0;
  f();
  considerMutated(x$21);
}
{
  let f$1 = function () {
    debugger;
    foo$9: {
      {
        let $implicitThrow$19 = false;
        let $finalStep$9 = false;
        let $finalCatchArg$19 = undefined;
        let $finalArg = undefined;
        $finally$19: {
          try {
            {
              $finalStep$9 = true;
              $finalArg = `not me`;
              break $finally$19;
            }
          } catch ($finalImplicit$19) {
            $implicitThrow$19 = true;
            $finalCatchArg$19 = $finalImplicit$19;
          }
        }
        {
          return;
        }
        if ($implicitThrow$19) throw $finalCatchArg$19;
        else throw $finalArg;
      }
    }
  };
  let x$23 = 0;
  f$1();
  considerMutated(x$23);
}
{
  let f$3 = function () {
    debugger;
    stop: {
      let $implicitThrow$21 = false;
      let $finalStep$11 = false;
      let $finalCatchArg$21 = undefined;
      let $finalArg$1 = undefined;
      $finally$21: {
        try {
          {
            $finalStep$11 = true;
            $finalArg$1 = x$25;
            break $finally$21;
          }
        } catch ($finalImplicit$21) {
          $implicitThrow$21 = true;
          $finalCatchArg$21 = $finalImplicit$21;
        }
      }
      {
        break stop;
      }
      if ($implicitThrow$21) throw $finalCatchArg$21;
      else throw $finalArg$1;
    }
    x$25 = 1;
  };
  let x$25 = 0;
  f$3();
  considerMutated(x$25);
}
{
  let f$5 = function () {
    debugger;
    stop$1: {
      let $implicitThrow$23 = false;
      let $finalStep$13 = false;
      let $finalCatchArg$23 = undefined;
      let $finalArg$3 = undefined;
      $finally$23: {
        try {
          {
            $finalStep$13 = true;
            $finalArg$3 = `one`;
            break $finally$23;
          }
        } catch ($finalImplicit$23) {
          $implicitThrow$23 = true;
          $finalCatchArg$23 = $finalImplicit$23;
        }
      }
      {
        break stop$1;
      }
      if ($implicitThrow$23) throw $finalCatchArg$23;
      else throw $finalArg$3;
    }
    x$27 = 1;
  };
  let x$27 = 0;
  f$5();
  considerMutated(x$27);
}
{
  let f$7 = function () {
    debugger;
    stop$3: {
      let $implicitThrow$25 = false;
      let $finalStep$15 = false;
      let $finalCatchArg$25 = undefined;
      let $finalArg$5 = undefined;
      $finally$25: {
        try {
          x$29 = 1;
          {
            $finalStep$15 = true;
            $finalArg$5 = `one`;
            break $finally$25;
          }
        } catch ($finalImplicit$25) {
          $implicitThrow$25 = true;
          $finalCatchArg$25 = $finalImplicit$25;
        }
      }
      {
        break stop$3;
      }
      if ($implicitThrow$25) throw $finalCatchArg$25;
      else throw $finalArg$5;
    }
  };
  let x$29 = 0;
  f$7();
  considerMutated(x$29);
}
{
  let f$9 = function () {
    debugger;
    stop$5: {
      let $implicitThrow$27 = false;
      let $finalStep$17 = false;
      let $finalCatchArg$27 = undefined;
      let $finalArg$7 = undefined;
      $finally$27: {
        try {
          {
            $finalStep$17 = true;
            $finalArg$7 = `one`;
            break $finally$27;
          }
        } catch ($finalImplicit$27) {
          $implicitThrow$27 = true;
          $finalCatchArg$27 = $finalImplicit$27;
        }
      }
      {
        break stop$5;
      }
      if ($implicitThrow$27) throw $finalCatchArg$27;
      else throw $finalArg$7;
    }
  };
  let x$31 = 0;
  f$9();
  considerMutated(x$31);
}
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  x = 1;
} catch (e) {}
considerMutated(x);
let x$1 = 0;
considerMutated(x$1);
let x$3 = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
x$3 = 1;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x$3);
  let x$5 = 0;
  let $implicitThrow$1 = false;
  let $finalCatchArg$1 = undefined;
  try {
    x$5 = 1;
  } catch ($finalImplicit$1) {
    $implicitThrow$1 = true;
    $finalCatchArg$1 = $finalImplicit$1;
  }
  if ($implicitThrow$1) {
    throw $finalCatchArg$1;
  } else {
    considerMutated(x$5);
    let x$7 = 0;
    let $implicitThrow$3 = false;
    let $finalCatchArg$3 = undefined;
    try {
      x$7 = 1;
    } catch ($finalImplicit$3) {
      $implicitThrow$3 = true;
      $finalCatchArg$3 = $finalImplicit$3;
    }
    if ($implicitThrow$3) {
      throw $finalCatchArg$3;
    } else {
      considerMutated(x$7);
      let x$9 = 0;
      let $implicitThrow$5 = false;
      let $finalCatchArg$5 = undefined;
      if ($implicitThrow$5) {
        throw $finalCatchArg$5;
      } else {
        considerMutated(x$9);
        let x$11 = 0;
        let $implicitThrow$7 = false;
        let $finalCatchArg$7 = undefined;
        x$11 = 1;
        if ($implicitThrow$7) {
          throw $finalCatchArg$7;
        } else {
          considerMutated(x$11);
          let x$13 = 0;
          foo: {
            let $implicitThrow$9 = false;
            let $finalStep = false;
            let $finalCatchArg$9 = undefined;
            $finally$9: {
              try {
                if ($) {
                  $finalStep = true;
                  break $finally$9;
                } else {
                }
              } catch ($finalImplicit$9) {
                $implicitThrow$9 = true;
                $finalCatchArg$9 = $finalImplicit$9;
              }
            }
            if ($implicitThrow$9) {
              throw $finalCatchArg$9;
            } else {
              if ($finalStep) {
                break foo;
              } else {
              }
            }
          }
          considerMutated(x$13);
          let x$15 = 0;
          foo$1: {
            let $implicitThrow$11 = false;
            let $finalStep$1 = false;
            let $finalCatchArg$11 = undefined;
            $finally$11: {
              try {
                $finalStep$1 = true;
                break $finally$11;
              } catch ($finalImplicit$11) {
                $implicitThrow$11 = true;
                $finalCatchArg$11 = $finalImplicit$11;
              }
            }
            x$15 = 1;
            if ($implicitThrow$11) {
              throw $finalCatchArg$11;
            } else {
              break foo$1;
            }
          }
          considerMutated(x$15);
          let x$17 = 0;
          foo$3: {
            let $implicitThrow$13 = false;
            let $finalStep$3 = false;
            let $finalCatchArg$13 = undefined;
            $finally$13: {
              try {
                $finalStep$3 = true;
                break $finally$13;
              } catch ($finalImplicit$13) {
                $implicitThrow$13 = true;
                $finalCatchArg$13 = $finalImplicit$13;
              }
            }
            x$17 = 1;
            if ($implicitThrow$13) {
              throw $finalCatchArg$13;
            } else {
              break foo$3;
            }
          }
          considerMutated(x$17);
          let x$19 = 0;
          foo$5: {
            let $implicitThrow$15 = false;
            let $finalStep$5 = false;
            let $finalCatchArg$15 = undefined;
            $finally$15: {
              try {
                $finalStep$5 = true;
                break $finally$15;
              } catch ($finalImplicit$15) {
                $implicitThrow$15 = true;
                $finalCatchArg$15 = $finalImplicit$15;
              }
            }
            x$19 = 1;
            if ($implicitThrow$15) {
              throw $finalCatchArg$15;
            } else {
              break foo$5;
            }
          }
          considerMutated(x$19);
          let f = function () {
            debugger;
            let $implicitThrow$17 = false;
            let $finalStep$7 = false;
            let $finalCatchArg$17 = undefined;
            $finally$17: {
              try {
                $finalStep$7 = true;
                break $finally$17;
              } catch ($finalImplicit$17) {
                $implicitThrow$17 = true;
                $finalCatchArg$17 = $finalImplicit$17;
              }
            }
            return undefined;
          };
          let x$21 = 0;
          f();
          considerMutated(x$21);
          let f$1 = function () {
            debugger;
            let $implicitThrow$19 = false;
            let $finalStep$9 = false;
            let $finalCatchArg$19 = undefined;
            let $finalArg = undefined;
            $finally$19: {
              try {
                $finalStep$9 = true;
                $finalArg = `not me`;
                break $finally$19;
              } catch ($finalImplicit$19) {
                $implicitThrow$19 = true;
                $finalCatchArg$19 = $finalImplicit$19;
              }
            }
            return undefined;
          };
          let x$23 = 0;
          f$1();
          considerMutated(x$23);
          let f$3 = function () {
            debugger;
            stop: {
              let $implicitThrow$21 = false;
              let $finalStep$11 = false;
              let $finalCatchArg$21 = undefined;
              let $finalArg$1 = undefined;
              $finally$21: {
                try {
                  $finalStep$11 = true;
                  $finalArg$1 = x$25;
                  break $finally$21;
                } catch ($finalImplicit$21) {
                  $implicitThrow$21 = true;
                  $finalCatchArg$21 = $finalImplicit$21;
                }
              }
              break stop;
            }
            x$25 = 1;
            return undefined;
          };
          let x$25 = 0;
          f$3();
          considerMutated(x$25);
          let f$5 = function () {
            debugger;
            stop$1: {
              let $implicitThrow$23 = false;
              let $finalStep$13 = false;
              let $finalCatchArg$23 = undefined;
              let $finalArg$3 = undefined;
              $finally$23: {
                try {
                  $finalStep$13 = true;
                  $finalArg$3 = `one`;
                  break $finally$23;
                } catch ($finalImplicit$23) {
                  $implicitThrow$23 = true;
                  $finalCatchArg$23 = $finalImplicit$23;
                }
              }
              break stop$1;
            }
            x$27 = 1;
            return undefined;
          };
          let x$27 = 0;
          f$5();
          considerMutated(x$27);
          let f$7 = function () {
            debugger;
            let $implicitThrow$25 = false;
            let $finalStep$15 = false;
            let $finalCatchArg$25 = undefined;
            let $finalArg$5 = undefined;
            $finally$25: {
              try {
                x$29 = 1;
                $finalStep$15 = true;
                $finalArg$5 = `one`;
                break $finally$25;
              } catch ($finalImplicit$25) {
                $implicitThrow$25 = true;
                $finalCatchArg$25 = $finalImplicit$25;
              }
            }
            return undefined;
          };
          let x$29 = 0;
          f$7();
          considerMutated(x$29);
          let f$9 = function () {
            debugger;
            let $implicitThrow$27 = false;
            let $finalStep$17 = false;
            let $finalCatchArg$27 = undefined;
            let $finalArg$7 = undefined;
            $finally$27: {
              try {
                $finalStep$17 = true;
                $finalArg$7 = `one`;
                break $finally$27;
              } catch ($finalImplicit$27) {
                $implicitThrow$27 = true;
                $finalCatchArg$27 = $finalImplicit$27;
              }
            }
            return undefined;
          };
          let x$31 = 0;
          f$9();
          considerMutated(x$31);
        }
      }
    }
  }
}
`````

## Output

`````js filename=intro
considerMutated(1);
considerMutated(0);
considerMutated(1);
considerMutated(1);
considerMutated(1);
considerMutated(0);
considerMutated(1);
considerMutated(0);
considerMutated(1);
considerMutated(1);
considerMutated(1);
considerMutated(0);
considerMutated(0);
considerMutated(1);
considerMutated(1);
considerMutated(1);
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
considerMutated( 1 );
considerMutated( 0 );
considerMutated( 1 );
considerMutated( 1 );
considerMutated( 1 );
considerMutated( 0 );
considerMutated( 1 );
considerMutated( 0 );
considerMutated( 1 );
considerMutated( 1 );
considerMutated( 1 );
considerMutated( 0 );
considerMutated( 0 );
considerMutated( 1 );
considerMutated( 1 );
considerMutated( 1 );
considerMutated( 0 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
