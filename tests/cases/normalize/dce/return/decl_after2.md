# Preval test case

# decl_after2.md

> Normalize > Dce > Return > Decl after2
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

In this case the let is block scoped so the earlier reference is not TDZ but rather an implicit global.

## Input

`````js filename=intro
const f = function() {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    // Note: let x is block scoped so this assignment to x is to a global!
    x = $(`fail too`);
  } else {
    let x = $(`fail`);
  }
};
f();
$(undefined);

`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $(`fail too`);
  } else {
    let x$1 = $(`fail`);
  }
};
f();
$(undefined);
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $(`fail too`);
    return undefined;
  } else {
    let x$1 = $(`fail`);
    return undefined;
  }
};
f();
$(undefined);
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  x = $(`fail too`);
} else {
  $(`fail`);
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  x = $( "fail too" );
}
else {
  $( "fail" );
}
$( undefined );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: false
 - 2: 'fail'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
