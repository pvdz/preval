# Preval test case

# complex_complex.md

> normalize > templates > complex_complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

If the function takes fewer args then what the template decomposes into then that gives us an opportunity to eliminate dead code?

A tagged template decomposes as follows;

```js
f`xyz`
//->
f(arrStringParts, expr1, expr2, ...exprs)
``` 

So all the string parts are passed on as the first argument and any expressions in between are spread as the remaining arguments.

So if the receiving function does not have as many parameters as the tagged template decompiles into, then that is an opportunity to optimize.

#TODO

## Input

`````js filename=intro
function f(x) { return x; }
f`abc ${ $(10) } ${ $(20) } def`;
`````

## Normalized

`````js filename=intro
function f(x) {
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpArg_2;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(10);
tmpArg_2 = $(20);
f(tmpArg, tmpArg_1, tmpArg_2);
`````

## Uniformed

`````js filename=intro
function x(x) {
  return x;
}
var x;
var x;
var x;
x = ['str', 'str', 'str'];
x = x(8);
x = x(8);
x(x, x, x);
`````

## Output

`````js filename=intro
function f(x) {
  return x;
}
var tmpArg;
var tmpArg_1;
var tmpArg_2;
tmpArg = ['abc ', ' ', ' def'];
tmpArg_1 = $(10);
tmpArg_2 = $(20);
f(tmpArg, tmpArg_1, tmpArg_2);
`````
