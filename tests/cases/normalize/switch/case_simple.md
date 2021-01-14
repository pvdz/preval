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
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      ifTestTmp_1 = 1 === 2;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        $(2);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = x;
  {
    var x = x;
    if (x) {
    } else {
      x = 8 * 8;
    }
    if (x) {
      ('str');
      {
        x(8);
      }
      x = x;
    }
  }
  {
    var x = x;
    if (x) {
    } else {
      x = 8 * 8;
    }
    if (x) {
      ('str');
      {
        x(8);
      }
      x = x;
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
let ifTestTmp_1 = tmpFallthrough;
if (ifTestTmp_1) {
} else {
  ifTestTmp_1 = false;
}
if (ifTestTmp_1) {
  $(2);
  tmpFallthrough = true;
}
`````
