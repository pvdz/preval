# Preval test case

# base_return_always.md

> Normalize > Loops > Base return always
>
> A loop with an unconditional early return

Theory crafting;

```js
// Explicitly exploiting the fact that `while(r)` will stop the loop with a falsy value, while still having
// two distinct values for a `break` and a `return` event.
const BREAK = false, CONTINUE = true, RETURN = undefined;

function f2(n, r, v) {
  if (r === RETURN) {
    return v;
  } else {
    $('afterwards');
    return 100;
  }
}
function f() {
  let n = 0;
  let r = CONTINUE; // This is our loop condition; 0=break, 1: continue, 2: return v
  let v = undefined; // Only a placeholder, used if the body returns explicitly
  while (r) { // Explicitly not `r === 1` because normalization would want to abstract that again (but maybe that's ok?)
    n = n + 1;
    // In this case the body had no branching so we could keep the return as-is
    // This would make certain analysis a lot more trivial to apply. Like this loop being a noop due to the unconditional return.
    return n;
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
    $(++n);
    return n;
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
    $(++n);
    return n;
  }
  $(`afterwards`);
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
    const tmpCallCallee = $;
    n = n + 1;
    let tmpCalleeParam = n;
    tmpCallCallee(tmpCalleeParam);
    return n;
  }
  $(`afterwards`);
  return 100;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let n = 0;
  while (true) {
    n = n + 1;
    $(n);
    return n;
  }
  $(`afterwards`);
  return 100;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
