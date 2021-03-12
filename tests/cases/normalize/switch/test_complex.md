# Preval test case

# test_complex.md

> Normalize > Switch > Test complex
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch ($(1)) {

}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
