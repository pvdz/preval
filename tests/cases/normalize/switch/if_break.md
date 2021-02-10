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
  }
  case 4: {
    if (5) {
      $(6);
      break;
    }
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
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = 1 === 4;
  }
  if (tmpIfTest$1) {
    {
      {
        {
          $(6);
          break tmpSwitchBreak;
        }
      }
    }
    tmpFallthrough = true;
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
