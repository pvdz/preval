# Preval test case

# decl_after_ident.md

> Normalize > Dce > Return > Decl after ident
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

## Input

`````js filename=intro
function f() {
  if ($(true)) {
    // This should trigger TDZ error, not be eliminated as side effect free
    x
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
  if ($(true)) {
    $throwTDZError(`Preval: TDZ triggered for this read: x;`);
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
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    throw `Preval: TDZ triggered for this read: x;`;
  } else {
    return undefined;
    let x = $(`fail`);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  throw `Preval: TDZ triggered for this read: x;`;
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  throw "Preval: TDZ triggered for this read: x;";
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
