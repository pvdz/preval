# Preval test case

# base.md

> Self assign noop > Base
>
> This is targeting a specific trick used by certain obfuscators.
> The pattern will create a function, then reassign a new function to that same binding. In this 
> particular case, the new function has no closures and the only discernible difference is its 
> instance reference. So as long as the function is only ever called, it should be perfectly safe
> to replace the outer function body with that of the inner (plus patch the header).
>  
> ```
> let f = function() {
>   f = function(){
>     $();
>   };
>   return a();
> }
> f();
> ```
>
> We will also support an alias check. If the function is assigned to another binding, we check
> this binding to confirm that it is only ever used as a function call.

## Input

`````js filename=intro
var a = function() {
  a = function(){
    $('inner');
  };
  return a();
}
a();
`````

## Pre Normal


`````js filename=intro
let a = undefined;
a = function () {
  debugger;
  a = function () {
    debugger;
    $(`inner`);
  };
  return a();
};
a();
`````

## Normalized


`````js filename=intro
let a = undefined;
a = function () {
  debugger;
  a = function () {
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
a();
`````

## Output


`````js filename=intro
$(`inner`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "inner" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
