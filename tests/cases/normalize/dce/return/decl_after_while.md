# Preval test case

# decl_after_while.md

> Normalize > Dce > Return > Decl after while
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  // This triggers TDZ
  while (x) {
    $('ded');
  }
  return;
  
  let x = $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while ($throwTDZError(`TDZ triggered for this read: while (x) {`)) {
    $(`ded`);
  }
  return;
  let x = $(`fail`);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (x) {`);
  while (true) {
    if (tmpIfTest) {
      $(`ded`);
      tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (x) {`);
    } else {
      break;
    }
  }
  return undefined;
  let x = $(`fail`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpAfterLabel = function ($$0, $$1) {
  let tmpIfTest$1 = $$0;
  const $tmpLoopUnrollCheck$1 = $$1;
  debugger;
  if ($tmpLoopUnrollCheck$1) {
    while ($LOOP_UNROLL_10) {
      if (tmpIfTest$1) {
        $(`ded`);
        tmpIfTest$1 = $throwTDZError(`TDZ triggered for this read: while (x) {`);
      } else {
        break;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
let tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (x) {`);
if (tmpIfTest) {
  $(`ded`);
  tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (x) {`);
  tmpAfterLabel(tmpIfTest, true);
} else {
  tmpAfterLabel(tmpIfTest, false);
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  let b = c;
  const d = e;
  debugger;
  if (d) {
    while ($LOOP_UNROLL_10) {
      if (b) {
        $( "ded" );
        b = f( "TDZ triggered for this read: while (x) {" );
      }
      else {
        break;
      }
    }
    return undefined;
  }
  else {
    return undefined;
  }
};
let g = f( "TDZ triggered for this read: while (x) {" );
if (g) {
  $( "ded" );
  g = f( "TDZ triggered for this read: while (x) {" );
  a( g, true );
}
else {
  a( g, false );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
