# Preval test case

# poc_in.md

> normalize > switch > poc_in
>
> Fall through example

Regression case

#TODO at the time of writing the tmpBinaryRight var decl disappears

## Input

`````js filename=intro
let x = 1;
switch (x) {
 case $(1):
   $('A');
}
`````

## Normalized

`````js filename=intro
let x = 1;
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = x;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $('A');
    }
    tmpFallthrough = true;
  }
}
`````

## Output

`````js filename=intro
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothRhs = $(1);
  tmpIfTest = 1 === tmpBinBothRhs;
}
if (tmpIfTest) {
  $('A');
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'A'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
