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
  $(x);
}

{
  let x = 0;
  try {
    
  } catch {
    x = 1
  }
  $(x);
}

{
  let x = 0;
  try {
  
  } finally {
    x = 1
  }
  $(x);
}

{
  let x = 0;
  try {
    x = 1
  } catch {
  
  } finally {
  
  }
  $(x);
}

{
  let x = 0;
  try {
    x = 1
  } catch {
  
  } finally {
  
  }
  $(x);
}

{
  let x = 0;
  try {
  
  } catch {
    x = 1
  } finally {
  
  }
  $(x);
}

{
  let x = 0;
  try {
  
  } catch {
  
  } finally {
    x = 1
  }
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
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
  $(x);
}
`````


## Settled


`````js filename=intro
$(1);
$(0);
$(1);
$(1);
$(1);
$(0);
$(1);
$(0);
$(1);
$(1);
$(1);
$(0);
$(0);
$(1);
try {
  throw `one`;
} catch (e$19) {}
$(1);
try {
  throw `one`;
} catch (e$21) {}
$(1);
try {
  throw `one`;
} catch (e$23) {}
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(0);
$(1);
$(1);
$(1);
$(0);
$(1);
$(0);
$(1);
$(1);
$(1);
$(0);
$(0);
$(1);
try {
  throw `one`;
} catch (e$19) {}
$(1);
try {
  throw `one`;
} catch (e$21) {}
$(1);
try {
  throw `one`;
} catch (e$23) {}
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 0 );
$( 1 );
$( 1 );
$( 1 );
$( 0 );
$( 1 );
$( 0 );
$( 1 );
$( 1 );
$( 1 );
$( 0 );
$( 0 );
$( 1 );
try {
  throw "one";
}
catch (a) {

}
$( 1 );
try {
  throw "one";
}
catch (b) {

}
$( 1 );
try {
  throw "one";
}
catch (c) {

}
$( 2 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 0
 - 7: 1
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
