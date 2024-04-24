# Preval test case

# decl_after_looped.md

> Normalize > Dce > Return > Decl after looped
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

Single loop doesn't change anything because the let is block scoped.

## Input

`````js filename=intro
function f() {
  while (true) {
    if ($(false)) {
      x = $('fail too');
    }
    return;
      
    let x = $('fail');
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    if ($(false)) {
      $(`fail too`), $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
    }
    return;
    let x = $(`fail`);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      $(`fail too`);
      $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
      return undefined;
    } else {
      return undefined;
      let x = $(`fail`);
    }
  }
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
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
$( undefined );
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
