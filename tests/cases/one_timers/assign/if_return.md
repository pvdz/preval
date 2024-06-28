# Preval test case

# if_return.md

> One timers > Assign > If return
>
> Return inlining

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
const x = $(100, `init`);
const tmpCalleeParam = $(x, `closure-return`);
$(tmpCalleeParam, `closure-global1`);
let tmpClusterSSA_x = undefined;
const tmpIfTest = $();
if (tmpIfTest) {
  const tmpReturnArg$1 = $(1, `f-return`);
  tmpClusterSSA_x = tmpReturnArg$1;
  $(tmpReturnArg$1, `x-global`);
} else {
  $(undefined, `x-global`);
}
const tmpCalleeParam$3 = $(tmpClusterSSA_x, `closure-return`);
$(tmpCalleeParam$3, `closure-global2`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100, "init" );
const b = $( a, "closure-return" );
$( b, "closure-global1" );
let c = undefined;
const d = $();
if (d) {
  const e = $( 1, "f-return" );
  c = e;
  $( e, "x-global" );
}
else {
  $( undefined, "x-global" );
}
const f = $( c, "closure-return" );
$( f, "closure-global2" );
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
