# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
  }
  break;
}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
tmpSwitchBreak: {
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    {
      $(3);
    }
    break tmpSwitchBreak;
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  const tmpIfTest = 0 <= 0;
  if (tmpIfTest) {
    $(3);
    break tmpSwitchBreak;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
