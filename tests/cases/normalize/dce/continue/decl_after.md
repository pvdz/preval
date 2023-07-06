# Preval test case

# decl_after.md

> Normalize > Dce > Continue > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  continue;
  
  let x = $('fail');
}
$('after, wont eval due to infinite loop');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $(`fail too`);
  continue;
  let x = $(`fail`);
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      x = $(`fail too`);
    } else {
    }
    continue;
    let x = $(`fail`);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    throw `Preval: Cannot access \`x\` before initialization`;
  } else {
  }
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  const tmpIfTest$2 = $(true);
  if (tmpIfTest$2) {
    const tmpIfTest$4 = $(false);
    if (tmpIfTest$4) {
      throw `Preval: Cannot access \`x\` before initialization`;
    } else {
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: false
 - 5: true
 - 6: false
 - 7: true
 - 8: false
 - 9: true
 - 10: false
 - 11: true
 - 12: false
 - 13: true
 - 14: false
 - 15: true
 - 16: false
 - 17: true
 - 18: false
 - 19: true
 - 20: false
 - 21: true
 - 22: false
 - 23: true
 - 24: false
 - 25: true
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
