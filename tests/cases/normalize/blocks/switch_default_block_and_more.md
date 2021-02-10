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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    {
      $(3);
    }
    break tmpSwitchBreak;
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
