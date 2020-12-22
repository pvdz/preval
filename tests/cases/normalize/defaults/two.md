# Preval test case

# two.md

> normalize > defaults > two
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = "bar") { 
  return [a, b]; 
}

$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let b = $tdz$__b === undefined ? 'bar' : $tdz$__b;
  let a = $tdz$__a === undefined ? 'foo' : $tdz$__a;
  return [a, b];
}
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Output

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let b = $tdz$__b === undefined ? 'bar' : $tdz$__b;
  let a = $tdz$__a === undefined ? 'foo' : $tdz$__a;
  return [a, b];
}
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````
