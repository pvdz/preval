# Preval test case

# second_defaults_to_first.md

> normalize > defaults > second_defaults_to_first
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = a) { 
  return [a, b]; 
}

$(f()); // [foo, foo]
$(f('x')); // [x, x]
$(f(undefined, 'y')); // [foo, y]
$(f('x', 'y')); // [x, y]
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let b = $tdz$__b === undefined ? a : $tdz$__b;
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
  let b = $tdz$__b === undefined ? a : $tdz$__b;
  let a = $tdz$__a === undefined ? 'foo' : $tdz$__a;
  return [a, b];
}
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````
