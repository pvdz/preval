# Preval test case

# return_dollar.md

> Function > Return dollar
>
> Function that returns a special dollar func call

Trying to test a function that is "pure" (no observable side effects) but is not easy to inline. Using the dollar hack since in test cases we assume this is an observable side effect that can't be reduced.

I'm happy to reach a point where it can inline the function properly though :D

(To be fair this is probably a case that's fairly easy to inline anyways, in the grand scheme of things)

#TODO

## Input

`````js filename=intro
function f() {
  return $();
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $();
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
