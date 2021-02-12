# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > case-block > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

For now I guess we can't really support this TDZ case. We have to outline the binding.

Maybe in the future we can come up with a solution where with more analysis we can do better. Not sure how important that is. But it's not a priority.

#TODO

## Input

`````js filename=intro

switch (1) { default: let x = x; $('fail'); }
`````

## Normalized

`````js filename=intro
{
  let x;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 0;
  {
    const tmpIfTest = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest) {
      $('fail');
    }
  }
}
`````

## Output

`````js filename=intro
{
  let x;
  let tmpSwitchCaseToStart = 0;
  {
    const tmpIfTest = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest) {
      $('fail');
    }
  }
}
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - 1: 'fail'
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 'fail'
 - eval returned: undefined
