# Preval test case

# base_return_cond.md

> Normalize > Loops > Base return cond
>
> A loop with a conditional early return

Theory crafting;

```js
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
    if (n > 10) {
      // Note: we only transform the `return n`. This transform does not need to care about where the return appeared.
      r = 2; // "return"
      v = n; // the argument node
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

#TODO

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    ++n;
    if (n > 10) {
      return n;
    }
  }
  $('afterwards');
  return 100;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    ++n;
    if (n > 10) {
      return n;
    }
  }
  $('afterwards');
  return 100;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    n = n + 1;
    const tmpIfTest = n > 10;
    if (tmpIfTest) {
      return n;
    }
  }
  $('afterwards');
  return 100;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let n = 0;
  while (true) {
    n = n + 1;
    const tmpIfTest = n > 10;
    if (tmpIfTest) {
      return n;
    }
  }
  $('afterwards');
  return 100;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
