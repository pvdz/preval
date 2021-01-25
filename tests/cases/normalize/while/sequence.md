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
  const tmpIfTest = x.x(x);
  if (tmpIfTest) {
  } else {
    break;
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
  const tmpIfTest = x.x(x);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
