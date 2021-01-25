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
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $(2);
      tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
    }
    if (tmpIfTest) {
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
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpBinaryLeft = tmpSwitchTest;
  tmpBinaryRight = $(2);
  tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
}
if (tmpIfTest) {
  $(3);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
