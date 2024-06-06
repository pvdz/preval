# Preval test case

# decl_after_closured.md

> Normalize > Dce > Return > Decl after closured
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function g() {
  function f() {
    // Note: calling f() will always crash with TDZ error but not before.
    $(x);
  }
  return f;
  // The point is that x is still referencable by f() so this line should be not DCE'd
  let x = $(1);
}
g()();
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    $(x);
  };
  return f;
  let x = $(1);
};
g()();
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    $(x);
    return undefined;
  };
  return f;
  let x = $(1);
  return undefined;
};
const tmpCallComplexCallee = g();
tmpCallComplexCallee();
`````

## Output


`````js filename=intro
const g = function () {
  debugger;
  const f = function () {
    debugger;
    $(x);
    return undefined;
  };
  return f;
  const x = $(1);
  return undefined;
};
const tmpCallComplexCallee = g();
tmpCallComplexCallee();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    $( c );
    return undefined;
  };
  return b;
  const c = $( 1 );
  return undefined;
};
const d = a();
d();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
