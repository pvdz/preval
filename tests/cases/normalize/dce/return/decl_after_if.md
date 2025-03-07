# Preval test case

# decl_after_if.md

> Normalize > Dce > Return > Decl after if
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

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

## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: if (x) {`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: if (x) {`;
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($throwTDZError(`Preval: TDZ triggered for this read: if (x) {`)) {
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
  throw `Preval: TDZ triggered for this read: if (x) {`;
  let x = 0;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: if (x) {";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
