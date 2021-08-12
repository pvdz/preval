# Preval test case

# base.md

> Normalize > Loops > Base
>
> How do you do loops?

Original

```
function f() {
  let n = 0;
  while (true) {
    if (++n > 10) break;
  }
  return 100;
}
$(f());
```

We can make it a function and call it, but how do we deal with all the abrupt completions?

```
function f() {
  let n = 0;
  function g() {
    n = n + 1;
    const tmpBinLhs = n;
    const tmpIfTest = tmpBinLhs > 10;
    if (tmpIfTest) {
      break;
    }
  }
  while (true) {
    g(); // Update to n stick because closure. but...
  }
}
$(100);
```

This works but as soon as you return something explicitly it falls apart

```
function f() {
  let n = 0;
  function g() {
    n = n + 1;
    const tmpBinLhs = n;
    const tmpIfTest = tmpBinLhs > 10;
    if (tmpIfTest) {
      return n;
    }
  }
  while (true) {
    const r = g(); // Update to n stick because closure. but...
    if (r.length>0) return r[0];

    // or

    const r = g(); // Update to n stick because closure. but...
    if ('r' in r) return r.r;

    // or?
  }
}
$(100);
```

What if we store the return value in a closure?

```
function f() {
  let n = 0;
  let tmpret = undefined;
  function g() {
    n = n + 1;
    const tmpBinLhs = n;
    const tmpIfTest = tmpBinLhs > 10;
    if (tmpIfTest) {
      tmpret = n;
      return true;
    }
    return false; // maybe
  }
  while (f());
  return tmpret;
}
$(100);
```

Is there a downside for inspection when all loops have that pattern?


```
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    i = i + 1;
  } else {
    break;
  }
}
$(100);
```
into
```
let i = 0;
let retValue = undefined;
function f() {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    i = i + 1;
  } else {
    return true;
  }
}
while (true) {
  if (f() === true) return retValue;
}
$(100);
```

The break becomes a return of calling the abstraction;

```
function f() {
  let n = 0;
  while (true) {
    if (++n > 10) break;
  }
  return n;
}
$(f());
```
into
```
function f() {
  let retValue = undefined;
  let n = 0;
  while (true) {
    if (++n > 10) {
      break;
    }
  }
  retValue = n;
  return retValue;
}
$(f());
```
into
```
function f() {
  let retValue = undefined;
  let n = 0;
  function floop() {
    n = n + 1;
    const t = n > 10;
    if (t) {
      fafter();
      return true;
    } else {
      return false;
    }
  }
  function fafter() {
    retValue = n;
  }
  while (true) {
    const r = f();
    if (r) return retValue;
  }
  fafter();
  return retValue;
}
$(f());
```
So a barebones normalized loop would look something like this
```
function f() {
  let retValue = undefined;
  while (true) {
    const r = loop();
    if (r) return retValue;
  }
  after();
  return retValue;
}
```
Maybe we can simplify that to
```
function f() {
  let retValue = undefined;
  let r = true;
  function loop() {}
  while (r) {
    r = loop();
  }
  after();
  return retValue;
}
```
Except that means the code after the loop may be invoked twice, so we'll need to signal that properly.
```
function f() {
  let retValue = undefined;
  let r = 0;
  function loop() {}
  while (r === 0) {
    r = loop();
  }
  if (loop === 2) {
    after();
    return retValue;
  } else {
    return retValue;
  }
}
```
With artificial examples of return/break/continue
```
function f() {
  let retValue = undefined;
  let r = 0; // 0: keep running, 1: explicit return, 2: break
  function loop() {
    if (x) {
      retValue = 100;
      return 1; // Signal for explicit return ("do not execute after()") 
    }
    if (y) {
      return 2; // Signal that this was a break
    }
    if (y) {
      return 0; // This was a continue
    }
    return 0; // No signal
  }
  while (r === 0) {
    r = loop();
  }
  // If the loop was broken (not returned from) then and only then call after();
  if (r === 2) {
    after();
    return retValue;
  } else {
    return retValue;
  }
}
```
But is that really simpler? Can we still semantically figure out what's going on? And how expensive is it to determine whether a loop is in normalized form or not?

Alternatively, but not necessarily better;
```
function f() {
  let retValue = undefined;
  let r = 0;
  function loop() {}
  while (r === 0) {
    r = loop();
    if (r === 1) {
      return retValue;
    }
    // If r is 2 then the loop condition will fail and after() is called as expected
  }
  after();
  return retValue;
}
```
I'm not sure there's a way to abstract the loop body without needing to have some kind of way of propagating an explicit return value.

The two obvious ways are by boxing the return value into a signal and value pair, or by basically doing the same through a closure.

I expect the closure to be easier to analyze statically. However, it somewhat limits certain rules due to the closure. Maybe that's a good thing... Loops are always going to be slightly special.

One potential solution is to abstract this into a special cased custom function. However, an abstraction like that would require the boxing approach.
```
function f() {
  let n = 0;
  while (true) {
    ++n;
    if (x) return n;
    if (y) break;
    if (z) continue;
  }
  $('afterwards');
  return 100;
}

// -->

function body() {
  if (x) return [1, 'explicit return'];
  if (y) return BREAK;     // A constant generated by preval that looks like [1, undefined]
  if (z) return undefined; // This may need to be an object if we define a caller to destructure
  return undefined;        // This may need to be an object if we define a caller to destructure
}
function after() {
  $('afterwards');
  return 100;
}
function f() {
  const x = $();
  const y = $();
  const z = $();
  return loop(body, after);
}

// This custom loop function would look something like
function loop(body, after) {
  let r = 1; // 0: break, 1: continue/nothing, 2: return
  let v = undefined;
  while (r) {
    const [r2, v] = body();
    if (r2 === 2) return v;
    else r = r2;
  }
  const q = after();
  return q;
}
```
This way the body of the loop contains one if/else and the whole function contains one loop and one if/else.

The `break` check is applied by the while condition and in both the break and "natural end of the loop" cases the after code is invoked and returned.

Without abstraction the transform would then look like this;

```js
function f() {
  let n = 0;
  while (true) {
    ++n;
    if (x) {
      return n;
    }
    if (y) {
      break;
    }
    if (z) {
      continue;
    }
  }
  $('afterwards');
  return 100;
}

// -->

function f2(n, r, v) {
  if (r === 1) {
    return v;
  } else {
    $('afterwards');
    return 100;
  }
}
function f() {
  let n = 0;
  let r = 1; // This is our loop condition; 0=break, 1: continue, 2: return v
  let v = undefined; // Only a placeholder, used if the body returns explicitly
  function body() {
    n = n + 1;
    if (x) {
      // Note: we only transform the `return n`. This transform does not need to care about where the return appeared.
      r = 2; // "return"
      v = n; // the argument node
      return;
    }
    if (y) {
      r = 0; // "break"
      return;
    }
    if (z) {
      // r is already 1 so we don't need to change anything
      return;
    }
    // The implicit end of the body is the same as a continue, and since r is still 1, we don't need to change anything
    return;
  }
  while (r) { // Explicitly not `r === 1` because normalization would want to abstract that again (but maybe that's ok?)
    body();
  }
  return f2(n, r, v);
}
f();
```

If the loop body does not contain any branching then it shouldn't be necessary to transform it.

In our case, it almost always contains branching due to our loop transforms doing a `while (true) { if (cond) {} else { break } }`

However, it's very well possible that those bodies would be inlined back into the loop immediately.

```
function f() {
  let x = 0;
  while (x < 5) {
    ++x;
  }
  return x;
}

//=>

function f() {
  let x = 0;
  while (true) {
    const t = x < 5;
    if (t) {
      x = x + 1;
    } else {
      break;
    }
  }
  return x;
}

//=>

function f() {
  let x = 0;
  let r = CONTINUE;
  let v = undefined;
  function f1() {
    const t = x < 5;
    if (t) {
      x = x + 1;
    } else {
      r = BREAK;
      return;
    }
  }
  function f2(x) {
    return x;
  }
  function f3(x, r, v) {
    if (r === RETURN) return v;
    else return f2(x);
  }
  while (r) {
    f();
  }
  return f3(x, r, v);
}

//=>

function f() {
  let x = 0;
  let r = CONTINUE;
  let v = undefined;
  function f1() {
    const t = x < 5;
    if (t) {
      x = x + 1;
    } else {
      r = BREAK;
      return;
    }
  }
  function f3(x, r, v) {
    if (r === RETURN) return v;
    else return x;
  }
  while (r) {
    f();
  }
  return f3(x, r, v);
}
```

We can improve the situation by detecting read-only access and turning those into arguments, rather than closures. Although that wouldn't change much for the above example.

However, value tracking may be able to figure out that `r` is only ever `CONTINUE` or `BREAK` and never `RETURN`, and optimize that check away accordingly.

It's a minor victory but that means the tail of the main function `f` simply returns `x` like the original.

```js
function f() {
  return 4;
}
```

If a function contains a toplevel loop whose test is `true`
- If the loop contains no branching
  - Move along
- Else
  - Abstract the code (whole body or starting from the branch only?) into (uniquely called) `body
  - Find all closures and greedily-yet-cautiously turn reads into params up until the point where we can no longer guarantee them to be immutable
  - Replace tail with abstraction (uniquely) called `tail` 
  - Prepend two new `let` bindings before the loop; `r` initialized to `true` and `v` initialized to `undefined`
    - `r` and `v` must be made unique like anything else
  - Any occurrence of `return x` in the body must be replaced with `r = false; v = x; return;` for the entire argument `x`
  - Any occurrence of `break` in the loop is replaced with `r = undefined; return;`
  - Any occurrence of `continue` in the loop is replaced with `return`
  - The body of the loop is replaced with a call to `body`, passing on any names that were detected to be read-only
  - The test of the loop is replaced with `r`
  - The tail (code after the loop) is replaced with `if (r === false) return v; else return tail();`
Notes:
  - If the loop was toplevel then there can not be a labeled break or continue that wants to jump "outside" of it
  - Other rules will take care of mangling the new functions into an unrecognizable though normalized mess
  - There are basically three abrupt completions we need to take care of in the loop; break, return, continue.
    - The continue case is the same as no abrupt completion
    - The return case is the only one where the tail is never called

A normalized loop, then, is a loop whose test is a simple node and whose body does not contain any other branching
Need to think harder about the `for-in` and `for-of` case since the approach taken here won't lead to normalized code for them.


```js
function f() {
  before();
  let binding = 0;
  while (true) {
    {
      if (!condition()) break;
      $('loop begin');
      ++binding;
      if (binding > 10) return binding;
      if (binding === 8) break;
      if (binding <= 6) continue;
      $('loop end');
    }
  }
  {
    ++binding;
    return $(binding);
  }
}

function f() {
  let r = true;
  let v = undefined;
  function body() {
    if (!condition()) { r = false; return; }
    $('loop begin');
    ++binding;
    if (binding > 10) { r = undefined; v = binding; return; }
    if (binding === 8) { r = false; return; }
    if (binding <= 6) { return; }
    $('loop end');
  }
  function tail() {
    ++binding;
    return $(binding);
  }
  before();
  let binding = 0;
  while (r) {
    body()
  }
  return tail();
}
```

What happens in a nested loop?

```js
function f() {
  while (true) {
    while (true) {
      return 100;
    }
  }
}
$(f());
```
-->
```js
function f() {
  let r2 = CONTINUE;
  let v2 = undefined;
  function f2() {
    r = RETURN;
    v = 100;
    r2 = RETURN;
    v2 = undefined;
    return undefined;
  }
  let r = CONTINUE;
  let v = undefined;
  function f1() {
    while (r2) {
      f2();
    }
    if (r2 === RETURN) return v2;
    else return undefined;
  }
  while (r) {
    f1();
  }
  if (r === RETURN) return v;
  else return undefined;
}
$(f());
```

#TODO

## Input

`````js filename=intro
function f() {
  for (let i=0; i<10; ++i) $(i);
  return 100;
}
const r = f();
$(r);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let i = 0;
    while (i < 10) {
      $(i);
      ++i;
    }
  }
  return 100;
};
const r = f();
$(r);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  let tmpIfTest = i < 10;
  while (tmpIfTest) {
    $(i);
    i = i + 1;
    tmpIfTest = i < 10;
  }
  return 100;
};
const r = f();
$(r);
`````

## Output

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 5
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - 11: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
