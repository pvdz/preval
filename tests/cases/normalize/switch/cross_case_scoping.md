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
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        a = 1;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$1 = tmpFallthrough;
    if (tmpIfTest$1) {
    } else {
      tmpIfTest$1 = 1 === 2;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  a = 1;
  tmpFallthrough = true;
}
let tmpIfTest$1 = tmpFallthrough;
if (tmpIfTest$1) {
} else {
  tmpIfTest$1 = false;
}
if (tmpIfTest$1) {
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
