# Preval test case

# noob_checks_has_member.md

> Const promotion > Noob checks has member
>
> A let decl with assignment later can be transformed if there are only statements in between with no observable side effects.

#TODO

## Input

`````js filename=intro
let x = $(10);
var a = function(){ return x; }; // Closure, making trivial analysis harder
var b = {set x(n){ x = $(30, 'from set'); }, get x() { return $(40, 'from get')}};
a = 2;
b.x = x;
x = $(20);
$(x, a, b, 'final');
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let b = undefined;
let x = $(10);
a = function () {
  debugger;
  return x;
};
b = {
  set x($$0) {
    let n = $$0;
    debugger;
    x = $(30, `from set`);
  },
  get x() {
    debugger;
    return $(40, `from get`);
  },
};
a = 2;
b.x = x;
x = $(20);
$(x, a, b, `final`);
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let x = $(10);
a = function () {
  debugger;
  return x;
};
b = {
  set x($$0) {
    let n = $$0;
    debugger;
    x = $(30, `from set`);
    return undefined;
  },
  get x() {
    debugger;
    const tmpReturnArg = $(40, `from get`);
    return tmpReturnArg;
  },
};
a = 2;
b.x = x;
x = $(20);
$(x, a, b, `final`);
`````

## Output

`````js filename=intro
let x = $(10);
const b = {
  set x($$0) {
    debugger;
    x = $(30, `from set`);
    return undefined;
  },
  get x() {
    debugger;
    const tmpReturnArg = $(40, `from get`);
    return tmpReturnArg;
  },
};
b.x = x;
x = $(20);
$(x, 2, b, `final`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 30, 'from set'
 - 3: 20
 - 4: 20, 2, { x: '<get/set>' }, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
