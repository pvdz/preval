# Preval test case

# base_ident_call_closure.md

> Function trampoline > Call return > Base ident call closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const f = function() {
  const g = function(a) {
    $('do');
    $('not');
    $('inline');
    const r = $(a);
    return r;
  };
  const h = function(){
    g(1);
  };
  const q = h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
  $(q);
};
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const g = function ($$0) {
    let a = $$0;
    debugger;
    $('do');
    $('not');
    $('inline');
    const r = $(a);
    return r;
  };
  const h = function () {
    debugger;
    g(1);
  };
  const q = h();
  $(q);
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const g = function ($$0) {
    let a = $$0;
    debugger;
    $('do');
    $('not');
    $('inline');
    const r = $(a);
    return r;
  };
  const h = function () {
    debugger;
    g(1);
    return undefined;
  };
  const q = h();
  $(q);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
$('do');
$('not');
$('inline');
$(1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'do'
 - 2: 'not'
 - 3: 'inline'
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
