# Preval test case

# try_finally_throw.md

> Flow > Try no throw > Try finally throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    x = 'pass';
    throw 'yes';
  } finally {
    $('still throws');
    $(x); // but we can observe x here
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    x = `pass`;
    throw `yes`;
  } finally {
    $(`still throws`);
    $(x);
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    x = `pass`;
    throw `yes`;
  } finally {
    $(`still throws`);
    $(x);
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = `fail`;
try {
  x = `pass`;
  throw `yes`;
} finally {
  $(`still throws`);
  $(x);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'still throws'
 - 2: 'pass'
 - eval returned: ('<crash[ yes ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
