# Preval test case

# decl_after.md

> Normalize > Dce > Throw > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(false)) x = $('fail too');
  throw 'exit';
  
  let x = $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(false)) x = $('fail too');
  throw 'exit';
  let x = $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $('fail too');
  } else {
  }
  throw 'exit';
  let x = $('fail');
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  throw 'Preval: Cannot access `x` before initialization';
} else {
  throw 'exit';
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: ('<crash[ exit ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
