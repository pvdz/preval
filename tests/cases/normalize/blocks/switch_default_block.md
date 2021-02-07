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
}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    {
      $(3);
    }
  }
}
`````

## Output

`````js filename=intro
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    {
      $(3);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
