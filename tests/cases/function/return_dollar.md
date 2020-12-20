# Preval test case

# return_string.md

> function > return_string
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

## Output

`````js filename=intro
function f() {
  return $();
}
$(f());
`````