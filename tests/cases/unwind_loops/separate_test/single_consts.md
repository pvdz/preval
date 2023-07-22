# Preval test case

# single_consts.md

> Unwind loops > Separate test > Single consts
>
> From react

#TODO

## Input

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < tmpArgumentsLen$9;
}
`````

## Pre Normal

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < tmpArgumentsLen$9;
}
`````

## Normalized

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const max = $(10);
let counter = 2;
let test = 2 < max;
while (true) {
  if (test) {
    const tmpCalleeParam$1891 = arr[counter];
    $(tmpCalleeParam$1891);
    counter = counter + 1;
    test = counter < tmpArgumentsLen$9;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const max = $(10);
let counter = 2;
let test = 2 < max;
const $tmpLoopUnrollCheck = test;
if (test) {
  $(103);
  counter = 3;
  test = 3 < tmpArgumentsLen$9;
} else {
}
if ($tmpLoopUnrollCheck) {
  const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
  while ($LOOP_UNROLL_10) {
    if (test) {
      const tmpCalleeParam$1 = arr[counter];
      $(tmpCalleeParam$1);
      counter = counter + 1;
      test = counter < tmpArgumentsLen$9;
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
let b = 2;
let c = 2 < a;
const d = c;
if (c) {
  $( 103 );
  b = 3;
  c = 3 < tmpArgumentsLen$9;
}
if (d) {
  const e = [ 101, 102, 103, 104, 105, 106, 107, 108, 109, 1010,, ];
  while ($LOOP_UNROLL_10) {
    if (c) {
      const f = e[ b ];
      $( f );
      b = b + 1;
      c = b < tmpArgumentsLen$9;
    }
    else {
      break;
    }
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpArgumentsLen$9

## Result

Should call `$` with:
 - 1: 10
 - 2: 103
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
