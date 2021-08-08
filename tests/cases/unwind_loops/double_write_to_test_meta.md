# Preval test case

# double_write_to_test_meta.md

> Unwind loops > Double write to test meta
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
for (let i=0; i<0; ++i) {
  $(i);
  ++i;
}
`````

## Pre Normal

`````js filename=intro
{
  let i = 0;
  while (i < 0) {
    {
      $(i);
      ++i;
    }
    ++i;
  }
}
`````

## Normalized

`````js filename=intro
let i = 0;
let tmpIfTest = i < 0;
while (tmpIfTest) {
  $(i);
  i = i + 1;
  i = i + 1;
  tmpIfTest = i < 0;
}
`````

## Output

`````js filename=intro
let i = 0;
let tmpIfTest = false;
while (tmpIfTest) {
  $(i);
  i = i + 1;
  i = i + 1;
  tmpIfTest = i < 0;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
