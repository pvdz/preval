# Preval test case

# base.md

> Function splitting > Base
>
> A function that tests on a param and has two separate code paths based on that test might be splittable if we know all the args.

#TODO

## Input

`````js filename=intro
function f(a) {
  if (a) {
    $('then');
  } else {
    $('else');
  }
}

f(0);
f('ok');
f(true);
f(false);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  if (a) {
    $(`then`);
  } else {
    $(`else`);
  }
};
f(0);
f(`ok`);
f(true);
f(false);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  if (a) {
    $(`then`);
    return undefined;
  } else {
    $(`else`);
    return undefined;
  }
};
f(0);
f(`ok`);
f(true);
f(false);
`````

## Output

`````js filename=intro
$(`else`);
$(`then`);
$(`then`);
$(`else`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'else'
 - 2: 'then'
 - 3: 'then'
 - 4: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
