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
var tmpBinaryRight;
let x = 1;
{
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryRight = $(1);
      ifTestTmp = x === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('A');
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
var tmpBinaryRight;
let tmpFallthrough = false;
let ifTestTmp = tmpFallthrough;
if (ifTestTmp) {
} else {
  tmpBinaryRight = $(1);
  ifTestTmp = 1 === tmpBinaryRight;
}
if (ifTestTmp) {
  $('A');
  tmpFallthrough = true;
}
`````
