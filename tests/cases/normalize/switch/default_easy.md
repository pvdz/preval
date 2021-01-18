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
    ('default case:');
    $(2);
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
$(2);
`````

## Result

Should call `$` with:
[[1], [2], null];

Normalized calls: Same

Final output calls: Same
