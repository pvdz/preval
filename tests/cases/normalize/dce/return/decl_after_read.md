# Preval test case

# decl_after_read.md

> Normalize > Dce > Return > Decl after read
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(false)) {
    // Must throw TDZ error
    $(x);
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
  if ($(false)) {
    $($throwTDZError(`Preval: TDZ triggered for this read: \$(x)`));
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
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    const tmpCallCallee = $;
    throw `Preval: TDZ triggered for this read: \$(x)`;
  } else {
    return undefined;
    let x = $(`fail`);
    return undefined;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  throw `Preval: TDZ triggered for this read: \$(x)`;
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  throw "Preval: TDZ triggered for this read: $(x)";
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
