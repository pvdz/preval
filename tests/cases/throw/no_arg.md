# Preval test case

# no_arg.md

> Throw > No arg
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw 'x';
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  throw `x`;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  throw `x`;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
throw `x`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "x";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ x ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
