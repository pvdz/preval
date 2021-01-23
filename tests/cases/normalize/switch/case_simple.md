# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: $(1);
  case 2: $(2);
}
`````

## Normalized

`````js filename=intro
{
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      ifTestTmp = 1 === 1;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $(1);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp$1 = tmpFallthrough;
    if (ifTestTmp$1) {
    } else {
      ifTestTmp$1 = 1 === 2;
    }
    if (ifTestTmp$1) {
      ('case 1:');
      {
        $(2);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let tmpFallthrough = false;
let ifTestTmp = tmpFallthrough;
if (ifTestTmp) {
} else {
  ifTestTmp = true;
}
if (ifTestTmp) {
  $(1);
  tmpFallthrough = true;
}
let ifTestTmp$1 = tmpFallthrough;
if (ifTestTmp$1) {
} else {
  ifTestTmp$1 = false;
}
if (ifTestTmp$1) {
  $(2);
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
