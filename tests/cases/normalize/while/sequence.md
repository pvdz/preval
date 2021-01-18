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
    } else {
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
  } else {
    break;
  }
}
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
