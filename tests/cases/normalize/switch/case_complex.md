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
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryRight = $(1);
    tmpIfTest = 1 === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $(11);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpBinaryRight$1 = $(2);
    tmpIfTest$1 = 1 === tmpBinaryRight$1;
  }
  if (tmpIfTest$1) {
    ('case 1:');
    {
      $(22);
    }
    tmpFallthrough = true;
  }
}
`````

## Output

`````js filename=intro
var tmpBinaryRight;
var tmpBinaryRight$1;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpBinaryRight = $(1);
  tmpIfTest = 1 === tmpBinaryRight;
}
if (tmpIfTest) {
  $(11);
  tmpFallthrough = true;
}
let tmpIfTest$1 = tmpFallthrough;
if (tmpIfTest$1) {
} else {
  tmpBinaryRight$1 = $(2);
  tmpIfTest$1 = 1 === tmpBinaryRight$1;
}
if (tmpIfTest$1) {
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
