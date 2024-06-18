# Preval test case

# base.md

> Function self assign closure alias > Base
>
> This is targeting a specific trick used by certain obfuscators.
> The pattern will create a function, then assign that function to an alias.
> First time the function is called it will update its own (original) reference with a new function.
>  
> This transform works when:
> - a is only assigned to inside a
> - a can not be called before the assignment to c
>
> ```
> let a = function a() {
> $();
> a = function b(){}
> $();
> }
> const c = a;
> c();
> ```
>
> Expected outcome something like this:
> ```
> const t = function a(){
> a = function b(){}
> }
> let a = t;
> const c = t;
> ```
> 
> This way we can, ultimately, safely assert what `t` is doing without worrying about the self-assignment of calling a.
> In this particular example (and the pattern in question), `t` can be replaced by `c`, and it can ignore the self-assignments.


## Input

`````js filename=intro
var a = function() {
  $();
  a = function(){}
  $();
}
var c = a;
a();
c();
a();
c();
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let c = undefined;
a = function () {
  debugger;
  $();
  a = function () {
    debugger;
  };
  $();
};
c = a;
a();
c();
a();
c();
`````

## Normalized


`````js filename=intro
let a = undefined;
let c = undefined;
a = function () {
  debugger;
  $();
  a = function () {
    debugger;
    return undefined;
  };
  $();
  return undefined;
};
c = a;
a();
c();
a();
c();
`````

## Output


`````js filename=intro
let a = function () {
  debugger;
  $();
  a = function () {
    debugger;
    return undefined;
  };
  $();
  return undefined;
};
const c = a;
a();
c();
a();
c();
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  $();
  a = function() {
    debugger;
    return undefined;
  };
  $();
  return undefined;
};
const b = a;
a();
b();
a();
b();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: 
 - 5: 
 - 6: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
