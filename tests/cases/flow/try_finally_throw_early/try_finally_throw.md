# Preval test case

# try_finally_throw.md

> Flow > Try finally throw early > Try finally throw
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
    throw_early
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
    throw_early;
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
    throw_early;
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
try {
  throw `yes`;
} finally {
  throw_early;
  $(`still throws`);
  $(`pass`);
}
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  throw "yes";
}
finally {
  throw_early;
  $( "still throws" );
  $( "pass" );
}
$( "pass" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

throw_early

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
