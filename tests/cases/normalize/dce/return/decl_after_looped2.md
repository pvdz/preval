# Preval test case

# decl_after_looped2.md

> Normalize > Dce > Return > Decl after looped2
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

The loop case is harder because here it is not guaranteed to be a TDZ error.

## Input

`````js filename=intro
function f() {
  while (true) {
    while (true) {
      if ($(false)) {
        x = $('fail too');
      }
      break;
    }
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
    while (true) {
      if ($(false)) {
        $(`fail too`), $throwTDZError(`Preval: TDZ triggered for this assignment: x = \$('fail too')`);
      }
      break;
    }
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
    unlabeledBreak: {
      const tmpIfTest = $(false);
      if (tmpIfTest) {
        $(`fail too`);
        throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
      } else {
        break unlabeledBreak;
      }
    }
    let x = $(`fail`);
  }
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:unknown*/ = $(false);
  if (tmpIfTest) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( false );
  if (a) {
    $( "fail too" );
    throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
  }
  else {
    $( "fail" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'fail'
 - 3: false
 - 4: 'fail'
 - 5: false
 - 6: 'fail'
 - 7: false
 - 8: 'fail'
 - 9: false
 - 10: 'fail'
 - 11: false
 - 12: 'fail'
 - 13: false
 - 14: 'fail'
 - 15: false
 - 16: 'fail'
 - 17: false
 - 18: 'fail'
 - 19: false
 - 20: 'fail'
 - 21: false
 - 22: 'fail'
 - 23: false
 - 24: 'fail'
 - 25: false
 - 26: 'fail'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Support this node type in isFree: LabeledStatement