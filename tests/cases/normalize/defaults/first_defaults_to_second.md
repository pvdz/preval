# Preval test case

# first_defaults_to_second.md

> normalize > defaults > first_defaults_to_second
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let b = $tdz$__b === undefined ? 'bar' : $tdz$__b;
  let a = $tdz$__a === undefined ? b : $tdz$__a;
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
  let a = $tdz$__a === undefined ? b : $tdz$__a;
  return [a, b];
}
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````
