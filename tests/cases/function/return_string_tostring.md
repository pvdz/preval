# Preval test case

# return_string_tostring.md

> Function > Return string tostring
>
> A function that returns Date.now()

The function is assumed to be pure (no observable side effects) but still not inlinable, although Date.now() is probably insufficient to stop this.

#TODO

## Input

`````js filename=intro
function f() {
  return String.toString();
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return String.toString();
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = String.toString();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = String.toString();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
