# Preval test case

# base_out2.md

> Function self assign closure alias > Base out2
>
> What happens when we feed it the expected output immediately
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
const b = function () {
  $(`before`);
  a = function () {
    $(`replaced`);
  };
  $(`after`);
};
let a = function () {
  $(`before`);
  a = function () {
    $(`replaced`);
  };
  $(`after`);
};
b();
b();
a();
b();
`````

## Pre Normal


`````js filename=intro
const b = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
  };
  $(`after`);
};
let a = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
  };
  $(`after`);
};
b();
b();
a();
b();
`````

## Normalized


`````js filename=intro
const b = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
    return undefined;
  };
  $(`after`);
  return undefined;
};
let a = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
    return undefined;
  };
  $(`after`);
  return undefined;
};
b();
b();
a();
b();
`````

## Output


`````js filename=intro
let a = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
    return undefined;
  };
  $(`after`);
  return undefined;
};
const b = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
    return undefined;
  };
  $(`after`);
  return undefined;
};
b();
b();
a();
b();
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  $( "before" );
  a = function() {
    debugger;
    $( "replaced" );
    return undefined;
  };
  $( "after" );
  return undefined;
};
const b = function() {
  debugger;
  $( "before" );
  a = function() {
    debugger;
    $( "replaced" );
    return undefined;
  };
  $( "after" );
  return undefined;
};
b();
b();
a();
b();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before'
 - 2: 'after'
 - 3: 'before'
 - 4: 'after'
 - 5: 'replaced'
 - 6: 'before'
 - 7: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
