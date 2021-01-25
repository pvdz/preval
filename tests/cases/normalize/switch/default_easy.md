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
  default: $(2);
}
`````

## Normalized

`````js filename=intro
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
      $(1);
    }
    tmpFallthrough = true;
  }
  {
    ('default case:');
    $(2);
  }
}
`````

## Output

`````js filename=intro
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  $(1);
  tmpFallthrough = true;
}
$(2);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
