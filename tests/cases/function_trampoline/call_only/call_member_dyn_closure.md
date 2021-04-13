# Preval test case

# call_member_dyn_closure.md

> Function trampoline > Call only > Call member dyn closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const obj = {$};
const f = function() {
  const str = '$';
  const h = function(){
    obj[str](1);
  };
  h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
};
f();
`````

## Pre Normal

`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  const str = '$';
  const h = function () {
    debugger;
    obj[str](1);
  };
  h();
};
f();
`````

## Normalized

`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  const str = '$';
  const h = function () {
    debugger;
    obj[str](1);
    return undefined;
  };
  h();
  return undefined;
};
f();
`````

## Output

`````js filename=intro
const obj = { $: $ };
obj.$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
