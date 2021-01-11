# Preval test case

# sequence.md

> normalize > while > sequence
>
> Test should be normalized

#TODO

## Input

`````js filename=intro
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x.x(x))) {}
`````

## Normalized

`````js filename=intro
while (true) {
  x = x * 'str';
  x = x * 8;
  x = x;
  x = x * x;
  x = x.x;
  {
    let ifTestTmp = x.x(x);
    if (ifTestTmp) {
      break;
    }
  }
}
`````

## Uniformed

`````js filename=intro
while (x) {
  x = x * 'str';
  x = x * 8;
  x = x;
  x = x * x;
  x = x.x;
  {
    var x = x.x(x);
    if (x) {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
while (true) {
  x = x * 'str';
  x = x * 8;
  x = x;
  x = x * x;
  x = x.x;
  let ifTestTmp = x.x(x);
  if (ifTestTmp) {
    break;
  }
}
`````
