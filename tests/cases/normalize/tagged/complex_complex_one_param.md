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
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg = ['abc ', ' ', ' def'];
tmpArg$1 = $(10);
tmpArg$2 = $(20);
f(tmpArg, tmpArg$1, tmpArg$2);
`````

## Output

`````js filename=intro
function f(x) {
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpArg$2;
tmpArg = ['abc ', ' ', ' def'];
tmpArg$1 = $(10);
tmpArg$2 = $(20);
f(tmpArg, tmpArg$1, tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 20
 - 2: undefined

Normalized calls: Same

Final output calls: Same
