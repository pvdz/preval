# Preval test case

# reverse_closure.md

> Locking > Reverse closure
>
> A func that is being cleared after being called once is "locked". I guess.

In this case the function gets called before it is tested ...

## Input

`````js filename=intro
function f() {
  $('call me once');
}
function g() {
  let x = f;
  const t = function(){
    f();
    if (f) {
      f = false;
    }
  }
  return t;
}
$(g()());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
};
let g = function () {
  debugger;
  let x = f;
  const t = function () {
    debugger;
    f();
    if (f) {
      f = false;
    }
  };
  return t;
};
$(g()());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
  return undefined;
};
let g = function () {
  debugger;
  let x = f;
  const t = function () {
    debugger;
    f();
    if (f) {
      f = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  return t;
};
const tmpCallCallee = $;
const tmpCallComplexCallee = g();
const tmpCalleeParam = tmpCallComplexCallee();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`call me once`);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'call me once'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
