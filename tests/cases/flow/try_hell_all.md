# Preval test case

# try_hell_all.md

> Flow > Try hell all
>
> This is why we don't properly analyze the try/catch/finally for mutation state. And this is just the tip of the ice berg. No thank you.

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


## Settled


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


## Denormalized
(This ought to be the final result)

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


## PST Settled
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


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
