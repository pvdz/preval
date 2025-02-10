# Preval test case

# closured.md

> Redundant writes > Closured
>
> We can observe the initial local binding when it is a closure that can still access the binding afterwards.
> The second write would not complete and we could observe the initial value this way.

## Input

`````js filename=intro
let f;
try {
  let n = 1;
  f = function(){ return n; };
  if ($(true)) {
    n = $('throws 2');
  } else {
    n = $('throws 3');
  }
} catch {

}
$(f());
`````

## Pre Normal


`````js filename=intro
let f;
try {
  let n = 1;
  f = function () {
    debugger;
    return n;
  };
  if ($(true)) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(f());
`````

## Normalized


`````js filename=intro
let f = undefined;
try {
  let n = 1;
  f = function () {
    debugger;
    return n;
  };
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let f = undefined;
let n = 1;
try {
  f = function () {
    debugger;
    return n;
  };
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = 1;
try {
  a = function() {
    debugger;
    return b;
  };
  const c = $( true );
  if (c) {
    b = $( "throws 2" );
  }
  else {
    b = $( "throws 3" );
  }
}
catch (d) {

}
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'throws 2'
 - 3: 'throws 2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
