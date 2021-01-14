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
{
  const tmpSwitchTest = $(1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      ('default case:');
      {
        $(3);
      }
      break tmpSwitchBreak;
    }
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x(8);
  x: {
    var x = x;
    {
      ('str');
      {
        x(8);
      }
      break x;
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
    break tmpSwitchBreak;
  }
}
`````
