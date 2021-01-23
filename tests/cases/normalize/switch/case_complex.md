# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

Ideal output:

```js
if (1 === $(1)) {
  $(11);
  $(22);
} else if (1 === $(2)) {
  $(22);
}
```

#TODO

## Input

`````js filename=intro
switch (1) {
  case $(1): $(11);
  case $(2): $(22);
}
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpBinaryRight$1;
{
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryRight = $(1);
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $(11);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp$1 = tmpFallthrough;
    if (ifTestTmp$1) {
    } else {
      tmpBinaryRight$1 = $(2);
      ifTestTmp$1 = 1 === tmpBinaryRight$1;
    }
    if (ifTestTmp$1) {
      ('case 1:');
      {
        $(22);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
var tmpBinaryRight;
var tmpBinaryRight$1;
let tmpFallthrough = false;
let ifTestTmp = tmpFallthrough;
if (ifTestTmp) {
} else {
  tmpBinaryRight = $(1);
  ifTestTmp = 1 === tmpBinaryRight;
}
if (ifTestTmp) {
  $(11);
  tmpFallthrough = true;
}
let ifTestTmp$1 = tmpFallthrough;
if (ifTestTmp$1) {
} else {
  tmpBinaryRight$1 = $(2);
  ifTestTmp$1 = 1 === tmpBinaryRight$1;
}
if (ifTestTmp$1) {
  $(22);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 11
 - 2: 22
 - 3: undefined

Normalized calls: Same

Final output calls: Same
