# Preval test case

# return_closure_dollar.md

> Function > Return closure dollar
>
> Function that returns a closure

Trying to test a function that is "pure" (no observable side effects) but is not easy to inline (because it returns a closure).

I'm happy to reach a point where it can inline the function properly though :D

#TODO

## Input

`````js filename=intro
const x = $(); // don't inline me
function f() {
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return x;
};
const x = $();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return x;
};
const x = $();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = $();
$(x);
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
