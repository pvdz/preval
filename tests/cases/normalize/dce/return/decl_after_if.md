# Preval test case

# decl_after_if.md

> Normalize > Dce > Return > Decl after if
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  // This triggers TDZ
  if (x) {
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
  if ($throwTDZError(`TDZ triggered for this read: if (x) {`)) {
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
  const tmpIfTest = $throwTDZError(`TDZ triggered for this read: if (x) {`);
  if (tmpIfTest) {
    $(`ded`);
    return undefined;
  } else {
    return undefined;
    let x = $(`fail`);
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $throwTDZError(`TDZ triggered for this read: if (x) {`);
if (tmpIfTest) {
  $(`ded`);
} else {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = b( "TDZ triggered for this read: if (x) {" );
if (a) {
  $( "ded" );
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
