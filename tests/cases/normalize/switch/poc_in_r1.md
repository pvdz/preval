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
var tmpBinaryLeft;
var tmpBinaryRight;
let x = 1;
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = x;
    tmpBinaryRight = $(1);
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
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
var tmpBinaryLeft;
var tmpBinaryRight;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpBinaryLeft = 1;
  tmpBinaryRight = $(1);
  tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
}
if (tmpIfTest) {
  $('A');
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: "A"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
