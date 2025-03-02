# Preval test case

# catch.md

> Let aliases > Catch
>
> When two const bindings are assigned the same value, they are an alias

## Input

`````js filename=intro
let x = $(1);
function f() {
  x = 2;
  f = function(){ return x };
  return f();
}
// a and b are clearly an alias
const a = x;
try {
  $();
} catch {
  const b = x;
  $(a, b);
  $(f);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  return f();
};
let x = $(1);
const a = x;
try {
  $();
} catch (e) {
  const b = x;
  $(a, b);
  $(f);
}
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
let x = $(1);
const a = x;
try {
  $();
} catch (e) {
  const b = x;
  $(a, b);
  $(f);
}
`````

## Output


`````js filename=intro
let f /*:()=>unknown*/ = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  const tmpReturnArg /*:unknown*/ = f();
  return tmpReturnArg;
};
let x /*:unknown*/ = $(1);
const a /*:unknown*/ = x;
try {
  $();
} catch (e) {
  const b /*:unknown*/ = x;
  $(a, b);
  $(f);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  b = 2;
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
let b = $( 1 );
const d = b;
try {
  $();
}
catch (e) {
  const f = b;
  $( d, f );
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
