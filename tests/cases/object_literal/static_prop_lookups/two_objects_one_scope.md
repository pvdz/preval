# Preval test case

# two_objects_one_scope.md

> Object literal > Static prop lookups > Two objects one scope
>
> Trying to catch a problem

Part of the included prettier bundle (originating from the performance.now stuff).

This bug would throw an assertion error "the previous ref should be reachable from the current ref" coming through the objlit_prop sweep in phase2.

If either of the object literals were removed then the problem wouldn't trigger. The `var` was also involved somehow.

The problem of this bug was that a certain kind of scope tracking should have used a fresh state per reference but it was sharing them with others. This test case is forcing that situation because two objects were assigned in the same scope.

#TODO

## Input

`````js filename=intro
var f = function () {
  let problem1 = x || {};
  problem1.now , y;
  var problem2 = {};
  $(problem2);
};

$(f());
`````

## Pre Normal

`````js filename=intro
let f = undefined;
f = function () {
  debugger;
  let problem2 = undefined;
  let problem1 = x || {};
  problem1.now, y;
  problem2 = {};
  $(problem2);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = undefined;
f = function () {
  debugger;
  let problem2 = undefined;
  let problem1 = x;
  if (problem1) {
  } else {
    problem1 = {};
  }
  problem1.now;
  y;
  problem2 = {};
  $(problem2);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let problem1 = x;
if (x) {
} else {
  problem1 = {};
}
problem1.now;
y;
const tmpSSA_problem2 = {};
$(tmpSSA_problem2);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
let a = x;
if (x) {

}
else {
  a = {};
}
a.now;
y;
const b = {};
$( b );
$( undefined );
`````

## Globals

BAD@! Found 2 implicit global bindings:

x, y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
