# Preval test case

# complex_complex_one_param.md

> Normalize > Tagged > Complex complex one param
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

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  return x;
};
f(['abc ', ' ', ' def'], $(10), $(20));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam = ['abc ', ' ', ' def'];
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$3 = $(20);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
$(10);
$(20);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
