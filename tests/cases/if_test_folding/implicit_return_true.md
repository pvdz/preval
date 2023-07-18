# Preval test case

# implicit_return_true.md

> If test folding > Implicit return true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

#TODO

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
}
f();
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if (x) {
    return false;
  }
  else {
    return true;
  }
},;
a();
const b = a();
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
