# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): {
    $(3);
  }
}
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
{
  const tmpSwitchTest = $(1);
  {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $(2);
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          {
            $(3);
          }
        }
        tmpFallthrough = true;
      }
    }
  }
}
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let ifTestTmp = tmpFallthrough;
if (ifTestTmp) {
} else {
  tmpBinaryLeft = tmpSwitchTest;
  tmpBinaryRight = $(2);
  ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
}
if (ifTestTmp) {
  $(3);
  tmpFallthrough = true;
}
`````
