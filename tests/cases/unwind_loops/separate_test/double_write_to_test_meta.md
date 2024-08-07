# Preval test case

# double_write_to_test_meta.md

> Unwind loops > Separate test > Double write to test meta
>
> Unrolling loops

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
while (true) {
  const tmpIfTest = i < 0;
  if (tmpIfTest) {
    $(i);
    i = i + 1;
    i = i + 1;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
