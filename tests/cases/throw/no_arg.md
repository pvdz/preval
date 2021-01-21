# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw f;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  throw f;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  throw f;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ function f(){ \n  throw f;\n} ]>

Normalized calls: BAD?!
['<crash[ function f() {throw f;} ]>'];

Final output calls: BAD!!
['<crash[ function f() {throw f;} ]>'];

