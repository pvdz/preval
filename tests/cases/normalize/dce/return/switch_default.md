# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      return;
    default:
      return $(2, 'ret');
      $('fail');
  }
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
        $('wrong branch');
        return undefined;
      }
    }
    {
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
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
