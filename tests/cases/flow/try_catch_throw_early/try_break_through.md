# Preval test case

# try_break_through.md

> Flow > Try catch throw early > Try break through
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    try {
      if ($) {
        return;
      } else {
        x = 'pass';
        throw 'too';
      }
      x = 'fail2'; // This is dead code either way
    } catch {
      $('caught');
    }
    $(x);
  }
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  foo: {
    try {
      if ($) {
        return;
      } else {
        x = `pass`;
        throw `too`;
      }
      x = `fail2`;
    } catch (e) {
      $(`caught`);
    }
    $(x);
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    if ($) {
      return undefined;
    } else {
      x = `pass`;
      throw `too`;
    }
  } catch (e) {
    $(`caught`);
  }
  $(x);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
if ($) {
} else {
  try {
    throw `too`;
  } catch (e) {
    $(`caught`);
  }
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {

}
else {
  try {
    throw "too";
  }
  catch (a) {
    $( "caught" );
  }
  $( "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
