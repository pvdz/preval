# Preval test case

# if-break.md

> normalize > switch > if-break
>
> Breaks don't need to be toplevel to a case...

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: {
    if (2) {
      $(3);
      break;
    }
    $(4);
    break;
  }
  case 'no': break;
}
`````

`````js filename=into
let fall = false;
if (1 === 1) {
  if (2) {
    $(3);
    fall = false;
  } else {
    $(4);
    fall = false;
  }
}
`````

## Normalized

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 1 === 1;
  }
  if (tmpIfTest) {
    {
      {
        {
          $(3);
          break tmpSwitchBreak;
        }
      }
    }
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = 1 === 'no';
  }
  if (tmpIfTest$1) {
    {
      break tmpSwitchBreak;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
