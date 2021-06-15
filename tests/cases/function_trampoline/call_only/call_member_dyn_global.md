# Preval test case

# call_member_dyn_global.md

> Function trampoline > Call only > Call member dyn global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const obj = {$};
const str = '$';
const f =  function() {
  obj[str](1);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````

## Pre Normal

`````js filename=intro
const obj = { $: $ };
const str = `$`;
const f = function () {
  debugger;
  obj[str](1);
};
f();
`````

## Normalized

`````js filename=intro
const obj = { $: $ };
const str = `$`;
const f = function () {
  debugger;
  obj[str](1);
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
