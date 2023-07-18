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
  try {
  } finally {
    x$3 = 1;
  }
  considerMutated(x$3);
}
{
  let x$5 = 0;
  try {
    x$5 = 1;
  } catch (e$3) {
  } finally {
  }
  considerMutated(x$5);
}
{
  let x$7 = 0;
  try {
    x$7 = 1;
  } catch (e$5) {
  } finally {
  }
  considerMutated(x$7);
}
{
  let x$9 = 0;
  try {
  } catch (e$7) {
    x$9 = 1;
  } finally {
  }
  considerMutated(x$9);
}
{
  let x$11 = 0;
  try {
  } catch (e$9) {
  } finally {
    x$11 = 1;
  }
  considerMutated(x$11);
}
{
  let x$13 = 0;
  foo: {
    try {
      if ($) break foo;
    } catch (e$11) {
      x$13 = 1;
    } finally {
    }
  }
  considerMutated(x$13);
}
{
  let x$15 = 0;
  foo$1: {
    try {
      break foo$1;
    } catch (e$13) {
    } finally {
      x$15 = 1;
    }
  }
  considerMutated(x$15);
}
{
  let x$17 = 0;
  foo$3: {
    try {
      break foo$3;
    } catch (e$15) {
    } finally {
      x$17 = 1;
    }
  }
  considerMutated(x$17);
}
{
  let x$19 = 0;
  foo$5: {
    try {
      break foo$5;
    } catch (e$17) {
    } finally {
      x$19 = 1;
    }
  }
  considerMutated(x$19);
}
{
  let f = function () {
    debugger;
    foo$7: {
      try {
        break foo$7;
      } finally {
        return;
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
      try {
        throw `not me`;
      } finally {
        return;
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
    stop: try {
      throw x$25;
    } finally {
      break stop;
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
    stop$1: try {
      throw `one`;
    } catch (e$19) {
      throw `two`;
    } finally {
      break stop$1;
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
    stop$3: try {
      x$29 = 1;
      throw `one`;
    } catch (e$21) {
      throw `two`;
    } finally {
      break stop$3;
    }
  };
  let x$29 = 0;
  f$7();
  considerMutated(x$29);
}
{
  let f$9 = function () {
    debugger;
    stop$5: try {
      throw `one`;
    } catch (e$23) {
      x$31 = 2;
      throw `two`;
    } finally {
      break stop$5;
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
x$3 = 1;
considerMutated(x$3);
let x$5 = 0;
try {
  x$5 = 1;
} catch (e$3) {
} finally {
}
considerMutated(x$5);
let x$7 = 0;
try {
  x$7 = 1;
} catch (e$5) {
} finally {
}
considerMutated(x$7);
let x$9 = 0;
considerMutated(x$9);
let x$11 = 0;
x$11 = 1;
considerMutated(x$11);
let x$13 = 0;
foo: {
  try {
    if ($) {
      break foo;
    } else {
    }
  } catch (e$11) {
    x$13 = 1;
  } finally {
  }
}
considerMutated(x$13);
let x$15 = 0;
foo$1: {
  try {
    break foo$1;
  } catch (e$13) {
  } finally {
    x$15 = 1;
  }
}
considerMutated(x$15);
let x$17 = 0;
foo$3: {
  try {
    break foo$3;
  } catch (e$15) {
  } finally {
    x$17 = 1;
  }
}
considerMutated(x$17);
let x$19 = 0;
foo$5: {
  try {
    break foo$5;
  } catch (e$17) {
  } finally {
    x$19 = 1;
  }
}
considerMutated(x$19);
let f = function () {
  debugger;
  const tmpLabeledBlockFunc = function () {
    debugger;
    try {
      const tmpReturnArg = tmpAfterLabel();
      return tmpReturnArg;
    } finally {
      return undefined;
    }
    console.log(x$21);
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function () {
    debugger;
    x$21 = `fail`;
    return undefined;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc();
  return tmpReturnArg$3;
};
let x$21 = 0;
f();
considerMutated(x$21);
let f$1 = function () {
  debugger;
  try {
    throw `not me`;
  } finally {
    return undefined;
  }
  return undefined;
};
let x$23 = 0;
f$1();
considerMutated(x$23);
let f$3 = function () {
  debugger;
  const tmpLabeledBlockFunc$1 = function () {
    debugger;
    try {
      throw x$25;
    } finally {
      const tmpReturnArg$5 = tmpAfterLabel$1();
      return tmpReturnArg$5;
    }
    const tmpReturnArg$7 = tmpAfterLabel$1();
    return tmpReturnArg$7;
  };
  const tmpAfterLabel$1 = function () {
    debugger;
    x$25 = 1;
    return undefined;
  };
  const tmpReturnArg$9 = tmpLabeledBlockFunc$1();
  return tmpReturnArg$9;
};
let x$25 = 0;
f$3();
considerMutated(x$25);
let f$5 = function () {
  debugger;
  const tmpLabeledBlockFunc$3 = function () {
    debugger;
    try {
      throw `one`;
    } catch (e$2) {
      throw `two`;
    } finally {
      const tmpReturnArg$11 = tmpAfterLabel$3();
      return tmpReturnArg$11;
    }
    const tmpReturnArg$13 = tmpAfterLabel$3();
    return tmpReturnArg$13;
  };
  const tmpAfterLabel$3 = function () {
    debugger;
    x$27 = 1;
    return undefined;
  };
  const tmpReturnArg$15 = tmpLabeledBlockFunc$3();
  return tmpReturnArg$15;
};
let x$27 = 0;
f$5();
considerMutated(x$27);
let f$7 = function () {
  debugger;
  try {
    x$29 = 1;
    throw `one`;
  } catch (e$21) {
    throw `two`;
  } finally {
    return undefined;
  }
  return undefined;
};
let x$29 = 0;
f$7();
considerMutated(x$29);
let f$9 = function () {
  debugger;
  try {
    throw `one`;
  } catch (e$23) {
    x$31 = 2;
    throw `two`;
  } finally {
    return undefined;
  }
  return undefined;
};
let x$31 = 0;
f$9();
considerMutated(x$31);
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
const f = function () {
  debugger;
  x$21 = `fail`;
  try {
    return undefined;
  } finally {
    return undefined;
  }
  console.log(`fail`);
  x$21 = `fail`;
  return undefined;
};
let x$21 = 0;
f();
considerMutated(x$21);
const f$1 = function () {
  debugger;
  try {
    throw `not me`;
  } finally {
    return undefined;
  }
  return undefined;
};
f$1();
considerMutated(0);
const f$3 = function () {
  debugger;
  try {
    throw x$25;
  } finally {
    x$25 = 1;
    return undefined;
  }
  x$25 = 1;
  return undefined;
};
let x$25 = 0;
f$3();
considerMutated(x$25);
const f$5 = function () {
  debugger;
  try {
    throw `one`;
  } catch (e$2) {
    throw `two`;
  } finally {
    x$27 = 1;
    return undefined;
  }
  x$27 = 1;
  return undefined;
};
let x$27 = 0;
f$5();
considerMutated(x$27);
const f$7 = function () {
  debugger;
  x$29 = 1;
  try {
    throw `one`;
  } catch (e$21) {
    throw `two`;
  } finally {
    return undefined;
  }
  return undefined;
};
let x$29 = 0;
f$7();
considerMutated(x$29);
const f$9 = function () {
  debugger;
  try {
    throw `one`;
  } catch (e$23) {
    x$31 = 2;
    throw `two`;
  } finally {
    return undefined;
  }
  return undefined;
};
let x$31 = 0;
f$9();
considerMutated(x$31);
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
const a = function() {
  debugger;
  b = "fail";
  try {
    return undefined;
  }
finally {
    return undefined;
  }
  console.log( "fail" );
  b = "fail";
  return undefined;
},;
let b = 0;
a();
considerMutated( b );
const c = function() {
  debugger;
  try {
    throw "not me";
  }
finally {
    return undefined;
  }
  return undefined;
},;
c();
considerMutated( 0 );
const d = function() {
  debugger;
  try {
    throw e;
  }
finally {
    e = 1;
    return undefined;
  }
  e = 1;
  return undefined;
},;
let e = 0;
d();
considerMutated( e );
const f = function() {
  debugger;
  try {
    throw "one";
  }
catch (e$2) {
    throw "two";
  }
finally {
    g = 1;
    return undefined;
  }
  g = 1;
  return undefined;
},;
let g = 0;
f();
considerMutated( g );
const h = function() {
  debugger;
  i = 1;
  try {
    throw "one";
  }
catch (e$21) {
    throw "two";
  }
finally {
    return undefined;
  }
  return undefined;
},;
let i = 0;
h();
considerMutated( i );
const j = function() {
  debugger;
  try {
    throw "one";
  }
catch (e$23) {
    k = 2;
    throw "two";
  }
finally {
    return undefined;
  }
  return undefined;
},;
let k = 0;
j();
considerMutated( k );
`````

## Globals

BAD@! Found 4 implicit global bindings:

considerMutated, e$2, e$21, e$23

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
