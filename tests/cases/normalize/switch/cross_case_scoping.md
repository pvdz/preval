# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

Bindings created in one case may be accessed by cases that follow it

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: let a = 1;
  case 2: $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a;
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
          a = 1;
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
          $(a);
        }
        tmpFallthrough = true;
      }
    }
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x;
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
          x = 8;
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
          x(x);
        }
        x = x;
      }
    }
  }
}
`````

## Output

`````js filename=intro
let a;
let tmpFallthrough = false;
let ifTestTmp = tmpFallthrough;
if (ifTestTmp) {
} else {
  ifTestTmp = true;
}
if (ifTestTmp) {
  a = 1;
  tmpFallthrough = true;
}
let ifTestTmp_1 = tmpFallthrough;
if (ifTestTmp_1) {
} else {
  ifTestTmp_1 = false;
}
if (ifTestTmp_1) {
  $(a);
  tmpFallthrough = true;
}
`````
