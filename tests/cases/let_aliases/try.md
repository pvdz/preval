# Preval test case

# try.md

> Let aliases > Try
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
    const b = x;
    $(a, b);
    $(f);
} catch {
  $();
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
  const b = x;
  $(a, b);
  $(f);
} catch (e) {
  $();
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
  const b = x;
  $(a, b);
  $(f);
} catch (e) {
  $();
}
`````

## Output


`````js filename=intro
let f /*:()=>*/ = function () {
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
try {
  $(x, x);
  $(f);
} catch (e) {
  $();
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
try {
  $( b, b );
  $( a );
}
catch (d) {
  $();
}
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
let f = function () {
  x = 2;
  f = function () {
    return x;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
let x = $(1);
try {
  $(x, x);
  $(f);
} catch (e) {
  $();
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
