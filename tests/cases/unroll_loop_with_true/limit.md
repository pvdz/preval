# Preval test case

# limit.md

> Unroll loop with true > Limit
>
> Trying to unroll a while loop with `true` as condition.

## Options

- unrollTrue=50

## Input

`````js filename=intro
let str = '';
while (true) {
  str += 'x';
  if (str.length > 30) {
    break;
  }
}
$(str);
`````

## Pre Normal


`````js filename=intro
let str = ``;
while (true) {
  str += `x`;
  if (str.length > 30) {
    break;
  }
}
$(str);
`````

## Normalized


`````js filename=intro
let str = ``;
while (true) {
  const tmpStringConcatR = $coerce(str, `plustr`);
  str = `${tmpStringConcatR}x`;
  const tmpBinLhs = str.length;
  const tmpIfTest = tmpBinLhs > 30;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(str);
`````

## Output


`````js filename=intro
$(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
