# Preval test case

# return_string.md

> function > return_string
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

## Normalized

`````js filename=intro
function f() {
  return x;
}
const x = $();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  return x;
}
const x = $();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
