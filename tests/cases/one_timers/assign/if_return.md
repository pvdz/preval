# Preval test case

# if_return.md

> One timers > Assign > If return
>
> Return inlining

#TODO

## Input

`````js filename=intro
let x = $(100, 'init');
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return $(x, 'closure-return');
}
$(closure(), 'closure-global1');

function f() {
  if ($()) {
    return $(1, 'f-return');
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x, 'x-global');
$(closure(), 'closure-global2');
`````

## Pre Normal

`````js filename=intro
let closure = function () {
  debugger;
  return $(x, `closure-return`);
};
let f = function () {
  debugger;
  if ($()) {
    return $(1, `f-return`);
  }
};
let x = $(100, `init`);
$(closure(), `closure-global1`);
x = f();
$(x, `x-global`);
$(closure(), `closure-global2`);
`````

## Normalized

`````js filename=intro
let closure = function () {
  debugger;
  const tmpReturnArg = $(x, `closure-return`);
  return tmpReturnArg;
};
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpReturnArg$1 = $(1, `f-return`);
    return tmpReturnArg$1;
  } else {
    return undefined;
  }
};
let x = $(100, `init`);
const tmpCallCallee = $;
const tmpCalleeParam = closure();
const tmpCalleeParam$1 = `closure-global1`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
x = f();
$(x, `x-global`);
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = closure();
const tmpCalleeParam$5 = `closure-global2`;
tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpReturnArg$1 = $(1, `f-return`);
    return tmpReturnArg$1;
  } else {
    return undefined;
  }
};
const x = $(100, `init`);
const tmpCalleeParam = $(x, `closure-return`);
$(tmpCalleeParam, `closure-global1`);
const tmpClusterSSA_x = f();
$(tmpClusterSSA_x, `x-global`);
const tmpCalleeParam$3 = $(tmpClusterSSA_x, `closure-return`);
$(tmpCalleeParam$3, `closure-global2`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  if (b) {
    const c = $( 1, "f-return" );
    return c;
  }
  else {
    return undefined;
  }
};
const d = $( 100, "init" );
const e = $( d, "closure-return" );
$( e, "closure-global1" );
const f = a();
$( f, "x-global" );
const g = $( f, "closure-return" );
$( g, "closure-global2" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100, 'init'
 - 2: 100, 'closure-return'
 - 3: 100, 'closure-global1'
 - 4: 
 - 5: undefined, 'x-global'
 - 6: undefined, 'closure-return'
 - 7: undefined, 'closure-global2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
