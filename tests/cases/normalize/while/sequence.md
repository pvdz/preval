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
  x;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
