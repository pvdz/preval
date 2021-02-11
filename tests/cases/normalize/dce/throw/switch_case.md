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
    case $(1, 'case'):
      throw $(2, 'ret');
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
      const tmpBinBothRhs = $(1, 'case');
      tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest) {
      {
        let tmpThrowArg = $(2, 'ret');
        throw tmpThrowArg;
      }
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
 - 2: 1, 'case'
 - 3: 2, 'ret'
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
