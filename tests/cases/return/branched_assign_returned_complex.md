# Preval test case

# branched_assign_returned_complex.md

> Return > Branched assign returned complex
>
> What if a binding was assigned a value in two branches and then returned after the `if`?

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(10);
  } else {
    x = $(20);
  }
  return x;
}
f();
f();
f();
f();
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  if ($(1)) {
    x = $(10);
  } else {
    x = $(20);
  }
  return x;
};
f();
f();
f();
f();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(10);
    return x;
  } else {
    x = $(20);
    return x;
  }
};
f();
f();
f();
f();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpClusterSSA_x = $(10);
    return tmpClusterSSA_x;
  } else {
    const tmpClusterSSA_x$1 = $(20);
    return tmpClusterSSA_x$1;
  }
};
f();
f();
f();
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    const c = $( 10 );
    return c;
  }
  else {
    const d = $( 20 );
    return d;
  }
};
a();
a();
a();
a();
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 1
 - 4: 10
 - 5: 1
 - 6: 10
 - 7: 1
 - 8: 10
 - 9: 1
 - 10: 10
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
