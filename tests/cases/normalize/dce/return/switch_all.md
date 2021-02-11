# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

If all switch cases return, including a default, then the code after a switch is dead code.

Simple case to check whether the switch transform doesn't prevent this.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
      $('eliminate');
    case $(1):
      $('keep, eval');
      return;
      $('eliminate');
    default:
      $('keep, do not eval');
      return $(2, 'ret');
      $('eliminate');
  }
  $('eliminate after switch');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpSwitchTest = $(1, 'disc');
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      const tmpBinBothLhs = tmpSwitchTest;
      const tmpBinBothRhs = $(0);
      tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest) {
      {
        $('keep, do not eval');
        return undefined;
      }
    }
    let tmpIfTest$1 = tmpFallthrough;
    if (tmpIfTest$1) {
    } else {
      const tmpBinBothLhs$1 = tmpSwitchTest;
      const tmpBinBothRhs$1 = $(1);
      tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    }
    if (tmpIfTest$1) {
      {
        $('keep, eval');
        return undefined;
      }
    }
    {
      $('keep, do not eval');
      const tmpReturnArg = $(2, 'ret');
      return tmpReturnArg;
    }
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 1
 - 4: 'keep, eval'
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
