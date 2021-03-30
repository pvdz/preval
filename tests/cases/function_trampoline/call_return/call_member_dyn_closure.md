# Preval test case

# call_member_dyn_closure.md

> Function trampoline > Call return > Call member dyn closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const obj = {$};
const f = function() {
  const str = '$';
  const h = function(){
    const r = obj[str](1);
    return r;
  };
  const q = h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
  $(q);
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
    const r = obj[str](1);
    return r;
  };
  const q = h();
  $(q);
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
    const r = obj[str](1);
    return r;
  };
  const q = h();
  $(q);
};
f();
`````

## Output

`````js filename=intro
const obj = { $: $ };
const q = obj.$(1);
$(q);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
