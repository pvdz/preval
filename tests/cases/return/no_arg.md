# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  return;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return undefined;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = undefined;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
