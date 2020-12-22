# Preval test case

# one.md

> normalize > defaults > one
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````

## Output

`````js filename=intro
function f($tdz$__a) {
  let a = $tdz$__a === undefined ? 'foo' : $tdz$__a;
  return a;
}
$(f('x'));
$(f());
`````
